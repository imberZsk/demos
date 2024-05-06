import { useEffect } from 'react'
import * as THREE from 'three'
import './App.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

function App() {
  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      '/01.glb',
      (gltf) => {
        // 获取模型
        const model = gltf.scene

        // 设置模型的位置和大小
        model.position.set(0, 0, 0)
        model.scale.set(1, 1, 1)

        // 创建场景
        const scene = new THREE.Scene()
        scene.background = new THREE.Color('rgb(255,255,255)')
        scene.add(model)

        // 创建相机
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.z = 5

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.querySelector('#container')?.appendChild(renderer.domElement)

        const gridHelper = new THREE.GridHelper(10, 10)
        scene.add(gridHelper)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.update()

        // 渲染
        const animate = function () {
          requestAnimationFrame(animate)
          model.rotation.y += 0.01
          renderer.render(scene, camera)
        }
        animate()
      },
      (xhr) => {
        console.log(`加载中... ${(xhr.loaded / xhr.total) * 100}%`)
      },
      (error) => {
        console.log('加载失败', error)
      }
    )
    // const scene = new THREE.Scene()
    // const camera = new THREE.PerspectiveCamera()

    // camera.position.x = 0
    // camera.position.y = 0
    // camera.position.z = 1

    // const axesHelper = new THREE.AxesHelper(2)
    // scene.add(axesHelper)

    // const renderer = new THREE.WebGLRenderer()
    // renderer.setSize(window.innerWidth, window.innerHeight)
    // document.getElementById('container')!.appendChild(renderer.domElement)

    // const gridHelper = new THREE.GridHelper(10, 10)
    // scene.add(gridHelper)

    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.update()

    // GLTFLoader

    // function animate() {
    //   requestAnimationFrame(animate)
    //   renderer.render(scene, camera)
    // }

    // animate()
  }, [])
  return <div id="container"></div>
}

export default App
