import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data(){
    return {
      itemImagelistener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImagelistener = ()=> {
      refresh() }
    this.$bus.$on('itemImageLoad',this.itemImagelistener)
  }
}


export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)  //500毫秒之内回到顶部
    },
    listenShowBackTop(position){
      this.isShowBackTop = position.y < -1000
    }
  }
}
