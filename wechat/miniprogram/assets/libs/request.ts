import { $deepMerge, $isFunction, $isObject, $safeCall } from "./utils";

/*
  fetch.ts
  fetch 网络请求
  Created by M.Wang [cn_wang@139.com]
  2021-05-23 10:28 Sunday
*/

interface FetchOptions  extends Omit<WXRequestOption  , "success" | "fail" | "complete"> {
  loading?: boolean
  loadingText?: string
  loadMask?: boolean
  hideLoadingType?: string
  toast?: boolean
}

type WXRequestOption = WechatMiniprogram.RequestOption;
type BeforeRequestOption = FetchOptions;
type RequestOption = Omit<FetchOptions, "url" | "method" | "data">;
type IAnyObject = WechatMiniprogram.IAnyObject;



export interface ICreateRequestOption {
  /* `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。 */
  baseUrl?: string;
  options?: RequestOption;
  beforeFetch?: (
    config: FetchOptions
  ) => Promise<BeforeRequestOption | void> | BeforeRequestOption | void;
  afterFetch?: (res: Response) => void;
}

interface Response<T = any> {
  ok: boolean;
  data?: T | null;
  error?: IAnyObject | null;
}
enum MethodEnum {
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  POST = "POST",
}
type TRequestType = keyof typeof MethodEnum;
type TReqyestPayload = string | IAnyObject | ArrayBuffer | undefined;

function Request(createOption: ICreateRequestOption = {}) {
  const baseUrl = createOption.baseUrl || "";
  const baseOption = createOption.options || {};

  async function _a<T>(
    method: TRequestType,
    url: string,
    payload: TReqyestPayload,
    option: RequestOption = {}
  ): Promise<Response<T>> {
    baseUrl !== "" && !url.startsWith("http") && (url = baseUrl + url);
    let reqOption = $deepMerge<BeforeRequestOption>(
      $deepMerge($deepMerge({}, baseOption), option),
      {
        url,
        data: payload,
        method,
      }
    );
    return await new Promise(async (resolve, _) => {
      const callAfterFn = function (data: Response) {
        createOption.afterFetch &&
          $safeCall(createOption.afterFetch, null, [data]);
        resolve(data);
      };
      if ($isFunction(createOption.beforeFetch)) {
        try {
          const r = await createOption.beforeFetch($deepMerge({}, reqOption));
          r && $isObject(r) && (reqOption = r);
        } catch (error) {
          console.error("call beforeFetch", error);
          return callAfterFn({ ok: !1, error });
        }
      }

      wx.request({
        ...reqOption,
        success(res) {
          callAfterFn({
            ok: !0,
            data: res.data,
          });
        },
        fail(err) {
          callAfterFn({
            ok: !1,
            error: err,
          });
        },
        complete(){
          if(reqOption.loading) wx.hideLoading()
        }
      });
    });
  }

  function _b(method: TRequestType, options: RequestOption = {}) {
    return <T>(
      url: string,
      payload?: TReqyestPayload,
      opts?: RequestOption
    ): Promise<Response<T>> => {
      return _a<T>(method, url, payload, { ...opts, ...options });
    };
  }
  const apis: any = {};
  [MethodEnum.GET, MethodEnum.POST, MethodEnum.PUT, MethodEnum.DELETE].forEach(
    (k) => {
      apis[k.toLocaleLowerCase()] = _b(k as TRequestType);
    }
  );

  return apis as Record<Lowercase<TRequestType>, ReturnType<typeof _b>>;
}

export function createRequest(opts: Partial<ICreateRequestOption>) {
  return Request(opts);
}
export default Request();
