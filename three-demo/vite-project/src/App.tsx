import { useEffect } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    // 75,
    // window.innerWidth / window.innerHeight,
    // 0.1,
    // 1000

    const color5 = new THREE.Color('skyblue')

    scene.background = color5

    // 立体纹理
    const textureCube = new THREE.CubeTextureLoader()
      .setPath('/textures/')
      // 左右上下前后
      .load([
        'left.jpeg',
        'right.jpeg',
        'top.jpeg',
        'bottom.jpeg',
        'front.jpeg',
        'back.jpeg'
      ])
    scene.background = textureCube

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('container')!.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const sphere = new THREE.SphereGeometry(1)

    // 材质
    const material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00
      color: 'rgb(255,255,255)'
      // envMap: textureCube
    })
    // 立方体，网状
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)

    function animate() {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()
  }, [])
  return <div id="container"></div>
}

export default App
