<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.$store.state.cartList.length === 0) return false
       // return !(this.$store.state.cartList.filter(item => !item.checked).length)
       return !(this.$store.state.cartList.find(item => !item.checked))
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          // for(let item of (this.$store.state.cartList)){
          //   item.checked = false
          // }
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else{
          // for(let item of (this.$store.state.cartList)){
          //   item.checked = true
          // }
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if(this.checkLength == 0){
          this.$toast.show('请选择购买的商品',1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eeeeee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: #ff8ab3;
    text-align: center;
  }
</style>
