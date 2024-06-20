import { $isFunction } from './utils'

type InstanceMethods = WechatMiniprogram.Component.InstanceMethods<
  Record<string, any>
>
export function setTabBarIdx(ctx: InstanceMethods, idx: number) {
  console.log(ctx, 'ctx', ctx.getTabBar())
  if (!$isFunction(ctx.getTabBar)) return
  ctx.getTabBar() && ctx.getTabBar().setData({ selected: idx })
}

export function toast(
  value: string,
  duration: number = 1500,
  mask: boolean = true
) {
  wx.showToast({
    title: value,
    icon: 'none',
    mask,
    duration
  })
}
