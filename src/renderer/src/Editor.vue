<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import 'element-plus/dist/index.css'

let camera, scene, renderer

function init(): void {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x999999)

  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(0.5, 1.0, 0.5).normalize()

  scene.add(light)

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500)

  camera.position.y = 5
  camera.position.z = 10

  scene.add(camera)

  const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x333333)
  scene.add(grid)
  // const grid2 = new THREE.GridHelper(50, 50, 0xffffff, 0x333333)
  // grid2.position.y = 10
  // scene.add(grid2)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)


  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render)
  controls.update()

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  render()
}

function render(): void {
  renderer.render(scene, camera)
}

const canvas = ref<HTMLDivElement | null>(null)


const currentMenuIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath)
}

const handleOpen = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath)
}
onMounted(() => {
  init()
  render()
  canvas.value?.appendChild(renderer.domElement)
})
</script>

<template>
  <div class="menu">
    <el-header class="header">
      <!-- TOP NAVIGATION -->
      <el-menu :default-active="currentMenuIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item>The Tool</el-menu-item>
      </el-menu>
      <div class="h-6" />
    </el-header>
  </div>

  <div ref="canvas" class="renderer"></div>
</template>

<style lang="less">
@import './assets/css/styles.less';

.menu {
  position: absolute;
  // width: 100vw;
  // height: 100vh;
}

.header {
  padding: 0;
  width: 100vw;
}

.flex-grow {
  flex-grow: 1;
}

.sidebar {
  overflow-y: scroll;
}
</style>
