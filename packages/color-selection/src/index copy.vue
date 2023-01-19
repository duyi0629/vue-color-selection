<template>
  <div class="color-selection">
    <div class="color-box" id="789798" @click="draw">789789</div>

    <canvas
      id="myCanvas"
      width="200"
      height="100"
      style="border: 1px solid #d3d3d3"
    ></canvas>

    <canvas
      ref="myCanvas2"
      width="200"
      height="100"
      style="border: 1px solid #d3d3d3"
    ></canvas>
  </div>
</template>

<script>
// 声明无法在 <script setup> 中声明的选项
export default {
  name: "ColorSelection",
};
</script>
<script setup >
import { nextTick, onMounted, ref } from "vue";
const colorEl = ref(null);
const handleColor = () => {
  colorEl.value.click();
};
const canvas = ref();
const ctx = ref();
const grd = ref();
nextTick(() => {
  canvas.value = document.getElementById("myCanvas");
  ctx.value = canvas.value.getContext("2d");
  grd.value = ctx.value.createLinearGradient(0, 0, 200, 0);
  grd.value.addColorStop(0, "red");
  grd.value.addColorStop(1, "white");

  // 填充渐变
  ctx.value.fillStyle = grd;
  ctx.value.fillRect(0, 0, 200, 100);
  function pick(event) {
    // 获取鼠标坐标
    var x = event.layerX;
    var y = event.layerY;

    // 获取图片像素信息
    var pixel = ctx.value.getImageData(x, y, 1, 1);
    var data = pixel.data;
    console.log("pixel", pixel);

    // 获取rgba值
    var rgba =
      "rgba(" +
      data[0] +
      "," +
      data[1] +
      "," +
      data[2] +
      "," +
      data[3] / 255 +
      ")";

    // 设置小正方形的背景颜色
    // color.style.background = rgba;

    // 把拼接的字符串设置为元素的文本内容
    // text.textContent = rgba;
    console.info(rgba);
  }
  canvas.value.addEventListener("click", pick);
});
function draw() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  let imageData = null;
  const img = {
    width: 200,
    height: 200,
  };
  canvas.width = img.width;
  width = canvas.width;
  canvas.height = img.height;
  height = canvas.height;
  ctx.fillStyle = "rgb(255, 222, 210)";
  ctx.fillRect(0, 0, 200, 100);
  console.log(canvas, ctx, 55);
  // ctx.drawImage(0, 0, width, height);
  // imageData = ctx.getImageData(0, 0, width, height).data;
}
</script>

<style lang="scss">
</style>