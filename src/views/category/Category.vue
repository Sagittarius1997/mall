<template>
<!--  <h2>分类</h2>-->
  <div class="wrapper">
    <ul>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
      <li>啦啦啦啦</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad:true
      })
      this.scroll.on('scroll', (position) => {
        console.log(position);
      })
      this.scroll.on('pullingUp', ()=>{
        console.log('上拉加载更多');
      })
    }
  }
</script>
<style scoped>
.wrapper{
  height: 100px;
  overflow: hidden;
  background-color: red;
}
</style>
