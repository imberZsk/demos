import { useEffect } from 'react'
import * as THREE from 'three'
import './App.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function App() {
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    // 75,
    // window.innerWidth / window.innerHeight,
    // 0.1,
    // 1000

    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 1

    // const color5 = new THREE.Color('skyblue')

    // scene.background = color5

    const axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    // 立体纹理
    // const textureCube = new THREE.CubeTextureLoader()
    //   .setPath('/textures/')
    //   // 左右上下前后
    //   .load([
    //     'pano_r.jpg',
    //     'pano_l.jpg',
    //     'pano_u.jpg',
    //     'pano_d.jpg',
    //     'pano_f.jpg',
    //     'pano_b.jpg'
    //   ])

    const materials = []
    const texturepx = new THREE.TextureLoader().load('/textures/pano_r.jpg')
    materials.push(new THREE.MeshBasicMaterial({ map: texturepx }))
    const texturenx = new THREE.TextureLoader().load('/textures/pano_l.jpg')
    materials.push(new THREE.MeshBasicMaterial({ map: texturenx }))
    const texturepy = new THREE.TextureLoader().load('/textures/pano_u.jpg')
    materials.push(new THREE.MeshBasicMaterial({ map: texturepy }))
    const textureny = new THREE.TextureLoader().load('/textures/pano_d.jpg')
    materials.push(new THREE.MeshBasicMaterial({ map: textureny }))
    const texturepz = new THREE.TextureLoader().load('/textures/pano_f.jpg')
    materials.push(new THREE.MeshBasicMaterial({ map: texturepz }))
    const texturenz = new THREE.TextureLoader().load('/textures/pano_b.jpg')
    materials.push(new THREE.MeshBasicMaterial({ map: texturenz }))
    // scene.background = textureCube

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('container')!.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(10, 10, 10)

    // const sphere = new THREE.SphereGeometry(1)

    // 材质
    // const material = new THREE.MeshBasicMaterial({
    //   // color: 0x00ff00
    //   // color: 'rgb(255,255,255)',
    //   envMap: textureCube
    // })
    // 立方体，网状
    // const cube = new THREE.Mesh(geometry, material)
    const cube = new THREE.Mesh(geometry, materials)
    cube.geometry.scale(1, 1, -1)

    scene.add(cube)

    // camera.position.z = 1

    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    function animate() {
      requestAnimationFrame(animate)

      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()
  }, [])
  return <div id="container"></div>
}

export default App
