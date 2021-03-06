<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll ref="scroll" class="content" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

import {debounce} from "common/utils"
import {backTopMixin} from "common/mixin";
import {mapActions} from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: '',
      show: false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      //1.获取顶部图片轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //4.保存商品的详情信息
      this.detailInfo = data.detailInfo
      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    }),
      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      }),
      //4.给getThemeTopY赋值(对给this.themeTopYs赋值操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
  },
  methods: {
    ...mapActions(['addCart']),
    addToCart() {
      //1.获取购物车需要展示到数据
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      //2.将商品添加到购物车(1.Promise 2.mapActions)
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product)

      //以下二选一即可
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      this.addCart(product).then(res => {
        this.$toast.show(res);
        // this.message = res;
        // this.show = true;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // }, 1500);
        // console.log(res);
      })
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length

      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //是否显示返回顶部
      this.listenShowBackTop(position)
    },
    detailImageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}

.content {
  height: calc(100% - 44px - 49px);
}

</style>
