<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const size = 10
const divisions = 10

const gridHelper = new THREE.GridHelper(size, divisions)
scene.add(gridHelper)

camera.position.z = 5

function animate(): void {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

const canvas = ref<HTMLDivElement | null>(null)

onMounted(() => {
  animate()
  canvas.value?.appendChild(renderer.domElement)
})
</script>

<template>
  <div ref="canvas" class="renderer"></div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
