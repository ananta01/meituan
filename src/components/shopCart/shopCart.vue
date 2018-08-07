<template>
  <div>
    <div class="shop-cart" @click.stop="toggleList">
      <div class="cart-logo">
        <span class="logo" :class="{'logo-active': selectFoods.length}"></span>
        <span class="count" v-show="totalCount">{{totalCount}}</span>
      </div>
      <div class="desc">
        <span class="delivery">￥{{deliveryPrice}}元配送费</span>
        <span class="reach-shop">{{reachShop ? '支持自取' : '不支持自取'}}</span>
      </div>
      <div class="price" @click.stop="allMoney">
        <span class="cart-price" :class="{'cart-price-active': minPrice <= totalPrice}">{{computedMoney}}</span>
      </div>


      <!--弹出层-->
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrap">
                <cart-control :food="food" :size="24"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
  import CartControl from '../cartControl/cartControl';
  import BScroll from 'better-scroll';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },

      reachShop: {
        type: Boolean,
        default: false
      },

      minPrice: {
        type: Number,
        default: 0
      }

    },
    data() {
      return {
        fold: true
      }
    },
    methods: {
      empty () {
        this.selectFoods.forEach((item) => {
          item.count = 0;
        })
      },

      hideList () {
        this.fold = true;
      },

      toggleList () {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },

      allMoney () {
        if(this.totalPrice >= this.minPrice) {
          alert(`已结算￥${this.totalPrice}元`);
          this.fold = !this.fold;
          this.empty();
        }else {
          return;
        }
      }
    },
    computed: {
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        });
        return count;
      },

      totalPrice () {
        let money = 0;
        this.selectFoods.forEach((food) => {
          money += food.price * food.count;
        });
        return money;
      },

      computedMoney () {
        if(this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let tempPrice = this.minPrice - this.totalPrice;
          return `还差￥${tempPrice}元`
        } else {
          return `已选${this.totalPrice}元`
        }
      },

      listShow () {
        if(!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if(show) {
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            }else {
              this.scroll.refresh();
            }
          })
        }
        return show;
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style scoped lang="stylus">

@import "../../common/css/mixin.styl";



  .shop-cart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    background: #353535
    z-index: 30
    color: #a3a3a3

    .cart-logo
      position: relative

      .logo
        position: absolute
        bottom: -50px
        left: 10px
        width: 70px
        height: 70px
        background: url("./cartIcon.png") no-repeat 0 0
        background-size: 70px 70px

        &.logo-active
          background: url("./cartIconActive.png") no-repeat 0 0
          background-size: 70px 70px

      .count
        position: absolute
        bottom: -26px
        left: 55px
        width: 20px
        height: 20px
        padding: 3px
        line-height: 20px
        border-radius: 50%
        background: #fe4b46
        text-align: center
        color: #fff

    .desc
      padding-left: 90px
      line-height: 50px
      font-size: 12px


      .delivery
        padding-right: 8px
        border-right: 1px solid #a3a3a3

      .reach-shop
        padding-left: 5px

    .price
      position: relative
      width: 100%
      height: 50px

      .cart-price
        position: absolute
        width: 90px
        height: 50px
        line-height: 50px
        padding: 0 5px
        text-align: center
        right: 0
        top: -50px

        &.cart-price-active
          background-color: #fcc336
          color: #fff
          font-weight: 700
          text-shadow: 0 1px 1px #cccccc

    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translate3d(0, -100%, 0)


      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7,17,27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0,160,220)



      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #ffffff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))

          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            width: 100px
            right: 50px
            top: 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)

          .cartcontrol-wrap
            position: absolute
            width: 100px
            height: 50px
            top: 5px
            right: 0






  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 20
    background-filter: blur(10px)
    background: rgba(7, 17, 27, .6)


</style>
