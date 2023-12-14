// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

'use client'

import { NextPage } from 'next'
import * as THREE from 'three'
import { useEffect, useRef, useCallback } from 'react'

import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '@/lib/model'

const GLBs = [
  {
    name: 'EXT',
    path: '/data/lynkco09/model/Lynkco09_EXT_d.glb'
  },
  {
    name: 'INT',
    path: '/data/lynkco09/model/Lynkco09_INT_d.glb'
  },
  {
    name: 'Sunproof',
    path: '/data/lynkco09/model/Lynkco09_Sunproof_d.glb'
  },
  {
    name: 'Trunk',
    path: '/data/lynkco09/model/Lynkco09_Trunk_d.glb'
  },
  {
    name: 'Tires',
    path: '/data/lynkco09/model/Lynkco09_Tires_d.glb'
  },
  {
    name: 'LBDoor',
    path: '/data/lynkco09/model/Lynkco09_LBDoor_d.glb'
  },
  {
    name: 'LFDoor',
    path: '/data/lynkco09/model/Lynkco09_LFDoor_d.glb'
  },
  {
    name: 'RFDoor',
    path: '/data/lynkco09/model/Lynkco09_RFDoor_d.glb'
  },
  {
    name: 'RBDoor',
    path: '/data/lynkco09/model/Lynkco09_RBDoor_d.glb'
  }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function easeOutCirc(x: any) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let controls: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let camera: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let scene: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let models: any = []

const tweenCollection = {
  LBDoor: {
    tween: null,
    from: { value: null },
    to: { value: null }
  },
  RBDoor: {
    tween: null,
    from: { value: null },
    to: { value: null }
  },
  LFDoor: {
    tween: null,
    from: { value: null },
    to: { value: null }
  },
  RFDoor: {
    tween: null,
    from: { value: null },
    to: { value: null }
  },
  Trunk: {
    tween: null,
    from: { value: null },
    to: { value: null }
  }
}

const Car: NextPage = () => {
  const refContainer = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refRenderer = useRef<any>(null)

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [])

  // 拾取对象
  const pickupObjects = useCallback(event => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      const offsetLeft = container.offsetLeft
      const offsetTop = container.offsetTop

      const mouse = new THREE.Vector2()
      mouse.x = ((event.clientX - offsetLeft) / scW) * 2 - 1
      mouse.y = -((event.clientY - offsetTop) / scH) * 2 + 1
      //使用射线
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObjects(scene.children)
      if (intersects.length > 0) {
        if (intersects[0].object.name.includes('Door') || intersects[0].object.name.includes('Trunk')) {
          const doorName = intersects[0].object.name.split('_')[0]
          const door = models.find(item => item.name === doorName)
          if (door && door.outer && door.status) {
            setupTweenDoor(door, door.status)
          }
        }
        if (intersects[0].object.name.includes('INT')) {
          controls.autoRotate = false
          const INT = models.find(item => item.name === 'INT')
          setupTweenCarIn(INT)
        }
      }
    }
  }, [])

  const setupTweenDoor = (door, status) => {
    const { from, to } = door.rotateDirection[status]
    if (status == 'open') {
      door.status = 'close'
    }
    if (status == 'close') {
      door.status = 'open'
    }
    // TWEEN.removeAll()
    let lastLocation = null
    if (tweenCollection[door.name].tween) {
      lastLocation = { value: tweenCollection[door.name].from.value }
      tweenCollection[door.name].tween.stop()
    } else {
      lastLocation = { value: from.value }
    }
    tweenCollection[door.name].tween = new TWEEN.Tween(lastLocation)
      .to(to, 1000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(function (lastLocation) {
        door.outer.rotation[door.rotateDirection.rotateAxis] = THREE.MathUtils.degToRad(lastLocation.value)
        tweenCollection[door.name].from.value = lastLocation.value
      })
      .onComplete(() => {
        tweenCollection[door.name] = {
          tween: null,
          from: { value: null },
          to: { value: null }
        }
      })
      .start()
  }

  const setupTweenCarIn = model => {
    const { x: cx, y: cy, z: cz } = camera.position
    const { x: tocx, y: tocy, z: tocz } = model.carInCameraPosition

    setupTweenCamera({ cx, cy, cz, ox: 0, oy: 0, oz: 0 }, { cx: tocx, cy: tocy, cz: tocz, ox: 0, oy: tocy, oz: 0.1 })

    function setupTweenCamera(source, target) {
      const carTween = new TWEEN.Tween(source).to(target, 2000).easing(TWEEN.Easing.Quadratic.Out)
      carTween.onUpdate(function (that) {
        camera.position.set(that.cx, that.cy, that.cz)
        controls.target.set(that.ox, that.oy, that.oz)
      })
      carTween.start()
    }
  }

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      // 渲染器
      const scW = container.clientWidth
      const scH = container.clientHeight
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer

      // 场景
      scene = new THREE.Scene()

      // 相机
      const target = new THREE.Vector3(-0.5, 0.5, 0)
      const initialCameraPosition = new THREE.Vector3(5 * Math.sin(0.2 * Math.PI), 2.5, 5 * Math.cos(0.2 * Math.PI))
      camera = new THREE.PerspectiveCamera(75, scW / scH, 0.1, 1000)
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      // 拖动
      controls = new OrbitControls(camera, renderer.domElement)
      // controls.autoRotate = true
      controls.target = target

      // 灯光
      const light1 = new THREE.DirectionalLight(0xffffff, 0.2)
      light1.position.set(0, 0, 10)
      scene.add(light1)
      const light2 = new THREE.DirectionalLight(0xffffff, 0.2)
      light2.position.set(0, 0, -10)
      scene.add(light2)
      const light3 = new THREE.DirectionalLight(0xffffff, 0.2)
      light3.position.set(10, 0, 0)
      scene.add(light3)
      const light4 = new THREE.DirectionalLight(0xffffff, 0.2)
      light4.position.set(-10, 0, 0)
      scene.add(light4)

      const light5 = new THREE.DirectionalLight(0xffffff, 0.2)
      light5.position.set(0, 10, 0)
      scene.add(light5)
      const light6 = new THREE.DirectionalLight(0xffffff, 0.2)
      light6.position.set(5, 10, 0)
      scene.add(light6)
      const light7 = new THREE.DirectionalLight(0xffffff, 0.2)
      light7.position.set(0, 10, 5)
      scene.add(light7)
      const light8 = new THREE.DirectionalLight(0xffffff, 0.2)
      light8.position.set(0, 10, -5)
      scene.add(light8)
      const light9 = new THREE.DirectionalLight(0xffffff, 0.2)
      light9.position.set(-5, 10, 0)
      scene.add(light9)

      // 加载模型和贴图等
      Promise.all(
        GLBs.map(item =>
          loadGLTFModel(scene, item, refRenderer, {
            receiveShadow: false,
            castShadow: false
          })
        )
      ).then(res => {
        models = res
        animate()
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let req: any = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          // camera.position.y = 10
          camera.position.y = 2.5
          camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        TWEEN.update()

        renderer.render(scene, camera)
      }
      return () => {
        cancelAnimationFrame(req)
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  })

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    window.addEventListener('click', pickupObjects, false) // 监听单击拾取对象初始化球体
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
      window.removeEventListener('click', pickupObjects, false)
    }
  }, [handleWindowResize, pickupObjects])

  return (
    <div ref={refContainer} className="h-screen w-screen">
      车
    </div>
  )
}

export default Car
