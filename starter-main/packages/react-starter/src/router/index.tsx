import FallBack from '@/comps/fallback'
import Layout from '@/comps/layout'
import Colorthief from '@/pages/demos/color-thief/color-thief'
import Three from '@/pages/demos/three-demo/three'
import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
const Home = lazy(() => import('@/pages/home'))
const AntdDemo = lazy(() => import('@/pages/demos/antd-demo/antd-demo'))
const AxiosDemo = lazy(() => import('@/pages/demos/axios-demo/axios-demo'))
const GsapDemo = lazy(() => import('@/pages/demos/gsap-demo/gsap-demo'))
const HooksDemo = lazy(() => import('@/pages/demos/hooks-demo/hooks-demo'))
const MobxDemo = lazy(() => import('@/pages/demos/mobx-demo/mobx-demo'))
const TsDemo = lazy(() => import('@/pages/demos/ts-demo/ts-demo'))
const ReactQuery = lazy(() => import('@/pages/demos/react-query/react-query'))
const SwiperDemo = lazy(() => import('@/pages/demos/swiper-demo/swiper-demo'))
const Lottie = lazy(() => import('@/pages/demos/lottie/lottie'))
const FramerMotion = lazy(
  () => import('@/pages/demos/framer-motion/framer-motion')
)
const ZustandDemo = lazy(
  () => import('@/pages/demos/zustand-demo/zustand-demo')
)
const Html2canvasDemo = lazy(
  () => import('@/pages/demos/html2canvas/html2canvas-demo')
)
const Waterfall = lazy(() => import('@/pages/demos/waterfall/waterfall'))
// 如果有通用的头部呢？
export const routeArr = [
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/ts',
        element: <TsDemo></TsDemo>
      },
      {
        path: '/antd',
        element: <AntdDemo></AntdDemo>
      },
      {
        path: '/hooks',
        element: <HooksDemo></HooksDemo>
      },
      {
        path: '/axios',
        element: <AxiosDemo></AxiosDemo>
      },
      {
        path: '/swiper',
        element: <SwiperDemo></SwiperDemo>
      },
      {
        path: '/mobx',
        element: <MobxDemo></MobxDemo>
      },
      {
        path: '/waterfall',
        element: <Waterfall></Waterfall>
      },
      {
        path: '/motion',
        element: <FramerMotion></FramerMotion>
      },
      {
        path: '/query',
        element: <ReactQuery></ReactQuery>
      },
      {
        path: '/gsap',
        element: <GsapDemo></GsapDemo>
      },
      {
        path: '/zustand',
        element: <ZustandDemo></ZustandDemo>
      },
      {
        path: '/html2canvas',
        element: <Html2canvasDemo></Html2canvasDemo>
      },
      {
        path: '/three',
        element: <Three></Three>
      },
      {
        path: '/lottie',
        element: <Lottie></Lottie>
      },
      {
        path: '/colorthief',
        element: <Colorthief></Colorthief>
      }
    ]
  }
]
routeArr.forEach((item) => {
  item.element = (
    <Suspense fallback={<FallBack></FallBack>}>{item.element}</Suspense>
  )
})
const router = createBrowserRouter(routeArr)
export default router
