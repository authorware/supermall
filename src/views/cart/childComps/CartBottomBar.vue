<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计：{{totalPrice}}</span>
    </div>
    <div class="calculate">
      <span>去计算({{checkLength}})</span>
    </div>
  </div>

</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '¥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((prevalue, item) => {
        return prevalue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => { return item.checked }).length
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;

    background-color: #eee;
    position: relative;

    height: 40px;
    line-height: 40px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 58px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 40px;
    flex: 1;
  }
  .calculate {
    background-color: var(--color-tint);
    width: 80px;
    color: #ffffff;
    text-align: center;
  }
</style>
