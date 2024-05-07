interface BaseOptions {
  method?: string
  credentials?: RequestCredentials
  strictErrors?: boolean
  headers?: HeadersInit
  body?: string | null
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'

interface ResponseObject {
  ok: boolean
  error: boolean
  status: number
  contentType: string | null
  bodyText: string
  response: Response
}

class FetchJson {
  private baseOptions: BaseOptions = {}

  constructor(options?: BaseOptions) {
    this.setBaseOptions(options || {})
  }

  public version = '3.1.1'

  public getBaseOptions(): BaseOptions {
    return this.baseOptions
  }

  public setBaseOptions(options: BaseOptions): BaseOptions {
    this.baseOptions = options
    return this.baseOptions
  }

  public request<T>(
    method: HttpMethod,
    url: string,
    data?: T,
    options?: BaseOptions
  ): Promise<ResponseObject> {
    const defaults: BaseOptions = {
      method,
      credentials: 'same-origin',
      strictErrors: false
    }

    const settings: BaseOptions = Object.assign(
      {},
      defaults,
      this.baseOptions,
      options
    )

    if (!settings.method || typeof settings.method !== 'string')
      throw Error('[fetch-json] HTTP method missing or invalid.')

    if (typeof url !== 'string')
      throw Error('[fetch-json] URL must be a string.')

    const httpMethod = settings.method.trim().toUpperCase()
    const isGetRequest = httpMethod === 'GET'

    type JSONHeader = {
      Accept: string
      'Content-Type': string
    }

    const jsonHeaders: Partial<JSONHeader> = { Accept: 'application/json' }

    if (!isGetRequest && data) jsonHeaders['Content-Type'] = 'application/json'

    settings.headers = Object.assign({}, jsonHeaders, settings.headers)

    const paramKeys = isGetRequest && data ? Object.keys(data) : []

    const getValue = (key: keyof T) => (data ? data[key] : '')

    const toPair = (key: string) =>
      key + '=' + encodeURIComponent(getValue(key as keyof T) as string)

    const params = () => paramKeys.map(toPair).join('&')

    const requestUrl = !paramKeys.length
      ? url
      : url + (url.includes('?') ? '&' : '?') + params()

    settings.body = !isGetRequest && data ? JSON.stringify(data) : null

    const toJson = (value: Response): Promise<ResponseObject> => {
      const response = value

      const contentType = response.headers.get('content-type')
      const isHead = httpMethod === 'HEAD'
      const isJson = !!contentType && /json|javascript/.test(contentType)
      const headersObj = () => Object.fromEntries(response.headers.entries())

      const textToObj = (httpBody: string): ResponseObject => ({
        ok: response.ok,
        error: !response.ok,
        status: response.status,
        contentType: contentType,
        bodyText: httpBody,
        response: response
      })

      const errToObj = (error: Error): ResponseObject => ({
        ok: false,
        error: true,
        status: 500,
        contentType: contentType,
        bodyText: 'Invalid JSON [' + error.toString() + ']',
        response: response
      })

      if (settings.strictErrors && !response.ok)
        throw Error(
          '[fetch-json] HTTP response status ("strictErrors" mode enabled): ' +
            response.status
        )

      return isHead
        ? response.text().then(headersObj)
        : isJson
        ? response.json().catch(errToObj)
        : response.text().then(textToObj)
    }

    const settingsRequestInit: RequestInit = JSON.parse(
      JSON.stringify(settings)
    )
    return fetch(requestUrl, settingsRequestInit).then(toJson)
  }

  public get<T>(
    url: string,
    params?: T,
    options?: BaseOptions
  ): Promise<ResponseObject> {
    return this.request<T>('GET', url, params, options)
  }

  public post<T>(
    url: string,
    resource: T,
    options?: BaseOptions
  ): Promise<ResponseObject> {
    return this.request<T>('POST', url, resource, options)
  }

  public put<T>(
    url: string,
    resource: T,
    options?: BaseOptions
  ): Promise<ResponseObject> {
    return this.request<T>('PUT', url, resource, options)
  }

  public patch<T>(
    url: string,
    resource: T,
    options?: BaseOptions
  ): Promise<ResponseObject> {
    return this.request<T>('PATCH', url, resource, options)
  }

  public delete<T>(
    url: string,
    resource: T,
    options?: BaseOptions
  ): Promise<ResponseObject> {
    return this.request<T>('DELETE', url, resource, options)
  }
}

const fetchJson = new FetchJson()
export { fetchJson, FetchJson }
