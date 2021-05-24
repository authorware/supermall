<template>
  <div class="wrapper">
    <ul>
      <li>{分类1}</li>
      <li>{分类2}</li>
      <li>{分类3}</li>
      <li>{分类4}</li>
      <li>{分类5}</li>
      <li>{分类6}</li>
      <li>{分类7}</li>
      <li>{分类8}</li>
      <li>{分类9}</li>
      <li>{分类10}</li>
      <li>{分类11}</li>
      <li>{分类12}</li>
      <li>{分类13}</li>
      <li>{分类14}</li>
      <li>{分类15}</li>
      <li>{分类16}</li>
      <li>{分类17}</li>
      <li>{分类18}</li>
      <li>{分类19}</li>
      <li>{分类20}</li>
      <li>类别1</li>
      <li>类别2</li>
      <li>类别3</li>
      <li>类别4</li>
      <li>类别5</li>
      <li>类别6</li>
      <li>类别7</li>
      <li>类别8</li>
      <li>类别9</li>
      <li>类别10</li>
      <li>类别11</li>
      <li>类别12</li>
      <li>类别13</li>
      <li>类别14</li>
      <li>类别15</li>
      <li>类别16</li>
      <li>类别17</li>
      <li>类别18</li>
      <li>类别19</li>
      <li>类别20</li>
    </ul>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Category",
  mounted() {
    new BScroll(document.querySelector('.wrapper'),{

    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
  }
</style>
