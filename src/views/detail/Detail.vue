<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" class="bottom-bar"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>  <!-- 监听组件的点击事件必须加上native修饰符 -->
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import { mapActions} from "vuex"

  import Toast from "components/common/toast/Toast";
  export default {
    name: "Detail",
    mixins:[itemListenerMixin, backTopMixin],
    data(){
      return {
        iid: null,
        topImages: [],
        goods:{},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo:{},
        recommends: [],
        themeTopYs:[],
        currentIndex: 0,
        message: '',
        show: false
      }
    },
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
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid

      //根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        //7.请求推荐数据
        getRecommend().then(res=>{
          this.recommends = res.data.list
        })
        //第一次获取，值不对
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);

        //第三次获取，值不对
        // this.$nextTick(()=>{    //dom渲染完成后会回调这个函数，但是虽然DOM渲染完成，但是图片还没有加载完成，因此拿到的offsetTop不对
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })

      })
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh();
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        this.listenShowBackTop(position)
        //1.获取y值
        const positionY = -position.y;
        //2.positionY和主题中Y值进行对比
        let length = this.themeTopYs.length;
        for(let i = 0; i < length; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

      },
      addToCart(){
        //1、获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.iid;
        //将商品添加到购物车
        this.addCart(product).then(res => {   //mapActions已经将方法映射到methods里面了
          // console.log(res);
          // this.show = true;
          // this.message = res;
          // setTimeout(() =>{
          //   this.show = false;
          //   this.message = ''
          // },1500)
          this.$toast.show(res, 2000)
        })
        // this.$store.dispatch('addCart', product).then(res =>{
        //   console.log(res)
        // })



      }
    },
    //第二次获取，值不对
    // mounted() {
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopYs);
    // },
    updated() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },

  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .bottom-bar{
    height: 49px;
    position: relative;
    bottom: 49px;
  }
</style>
