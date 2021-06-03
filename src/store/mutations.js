import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";

export default {
  //mutations唯一的目的就是修改state里的状态
  //mutations中的方法尽可能简单
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
}