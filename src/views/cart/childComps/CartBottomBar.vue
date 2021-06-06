<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计：{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      <span>去结算({{checkLength}})</span>
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
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !(this.cartList.find(item => {return !item.checked}))
    }
  },
  methods: {
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品')
      }
    },
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => {return item.checked = false})
      } else { // 部分选中 剩余的未选中
        this.cartList.forEach(item => {return item.checked = true})
      }
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
