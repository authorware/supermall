import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";
export default {
  addCart(context, payload){
    //1.查看新添加到商品是否在购物车里
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 如果在购物车里个数加1，否则新添加到购物车里
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
  }
}
