<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','上新','热销']"
                 class="fixed"
                 @tabClick="tabClick"
                 ref="tabControlCopy" v-show="isTabControlFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :titles="['流行','上新','热销']"
                   class="tab-control"
                   @tabClick="tabClick"
                   ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import {itemListenerMixin, backTopMixin} from "common/mixins";
  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";

  export default {
    name: "Home",
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: 'pop',
        tabControlOffsetTop: 0,
        isTabControlFixed: false,
        saveY: 0
      }
    },
    created() { // 在组件创建好的时候发送网络请求
      // 请求多个数据
      this.getMultidata()
      // 请求商品数据
      this.getGoods('pop')  // 流行
      this.getGoods('new')  // 上新
      this.getGoods('sell') // 热销
    },
    mounted() {
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      // 取消全局事件的监听
      this.$bus.$off('imageLoad', this.itemImageListener)
    },
    methods: {
      /**
       * 事件监听相关
       * */
      tabClick(index) {
        this.currentType = Object.keys(this.goods)[index]
        this.$refs.tabControlCopy.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      contentScroll(position) {
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000 ? true : false
        // 判断TabControl是否吸顶
        this.isTabControlFixed = (-position.y + 40) > this.tabControlOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        this.getGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad() {
        this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /**
       * 网络请求相关
       * */
      getMultidata() {
        // 请求多个数据
        getHomeMultidata()
            .then(res => {
              this.banners = res.data.banner.list
              this.recommends = res.data.recommend.list
            })
      },
      getGoods(type) {
        const page = this.goods[type].page + 1
        // 请求商品数据
        getHomeGoods(type, page)
            .then(res => {
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page++
            })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    z-index: 9;
  }

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
    /*margin-top: 44px;*/
  }

  .fixed {
    position: fixed;
    top: 43px;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>
