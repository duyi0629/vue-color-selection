<template>
  <div class="color-selection">
    <div class="color-show">
      <div class="color-show-box" @click="handleColorShowClick"></div>
      <span class="color-show-vlaue">#FFFFFF</span>
      <span class="color-show-transparency">30%</span>
    </div>
    <input type="color" />
    <div class="color-choose-box" v-if="showColorChoose">
      <div class="box-header">
        <span>纯色填充</span>
        <span>X</span>
      </div>
      <canvas id="colorBox" width="150" height="150"></canvas>
      <canvas id="colorList" width="150" height="150"></canvas>
      <Slider></Slider>
      <div class="canvas-box"></div>
    </div>
  </div>
</template>
<script>
import { nextTick } from "vue";
export default {
  name: "ColorSelection",
};
</script>

<script setup>
import { ref, unref } from "vue";
import Slider from "./components/Slider.vue";
//Whether to display the color selection pop-up box
const showColorChoose = ref(true);

const ctx = ref();
function draw() {
  var canvas = document.getElementById("colorBox");
  ctx.value = canvas.getContext("2d");

  const grd = ctx.value.createLinearGradient(150, 0, 0, 150);
  grd.addColorStop(0, "red");
  grd.addColorStop(1, "white");
  // 填充渐变
  ctx.value.fillStyle = grd;
  ctx.value.fillRect(0, 0, 150, 150);
  var imgData = ctx.value.getImageData(10, 10, 150, 150);
  console.log(imgData, "5555");
  canvas.addEventListener("click", pick);
}
function drawColorList() {
  var canvas = document.getElementById("colorList");
  const ctx = canvas.getContext("2d");

  const grd = ctx.createLinearGradient(0, 0, 150, 0);
  grd.addColorStop(0, "#f00");
  grd.addColorStop(1 / 6, "#f0f");
  grd.addColorStop(2 / 6, "#ff0");
  grd.addColorStop(3 / 6, "#00f");
  grd.addColorStop(4 / 6, "#0ff");
  grd.addColorStop(5 / 6, "#000");
  grd.addColorStop(1, "#f00");
  // 填充渐变
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 150, 150);
  console.log(imgData, "5555");
  canvas.addEventListener("click", pick);
}

function pick(event) {
  // 获取鼠标坐标
  var x = event.layerX;
  var y = event.layerY;

  // 获取图片像素信息
  var pixel = ctx.value.getImageData(x, y, 1, 1);
  console.info(event, pixel, x, y, "pixel");
}

function handleColorShowClick() {
  showColorChoose.value = !showColorChoose.value;
  if (unref(showColorChoose)) {
    nextTick(() => {
      draw();
    });
  }
}
nextTick(() => {
  draw();
  // drawColorList();
});
</script>

<style lang="scss">
.color-selection {
  position: relative;
  .color-show {
    width: 140px;
    height: 30px;
    background: #ebebee;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .color-show-box {
      width: 15px;
      height: 15px;
      background-color: #f00;
    }
    .color-show-vlaue {
      font-size: 14px;
    }
  }

  .color-choose-box {
    height: 500px;
    width: 220px;
    background: #999;
    position: absolute;
    top: 0;
    left: 180px;
    border-radius: 4px;
    .box-header {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
    .canvas-box {
      position: absolute;
      top: 80px;
      left: 80px;
      width: 30px;
      height: 30px;
      background: #fff;
    }
  }
}
</style>