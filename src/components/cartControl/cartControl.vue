<template>
    <div class="cartControl">
      <transition name="move">
        <div class="cart-decrease"  v-show="food.count>0"
             @click.stop.prevent="decreaseCart">
          <span class="inner icon-remove_circle_outline" :class="cartSize"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart" :class="cartSize"></div>
    </div>
</template>

<script>

  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      },
      size: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {}
    },
    methods: {
      decreaseCart () {
        if(this.food.count) {
          this.food.count--;
        }
      },
      addCart (event) {
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++;
        }
        this.$emit('cart-add', event.target)
      }
    },
    computed: {
      cartSize () {
        return 'size-' + this.size
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus">

  .move-enter-active, .move-leave-active
    transition: all .3s linear

  .move-enter, .move-leave-active
    opacity: 0
    transform: translate3d(0, 0, 0)
    transform: translateX(40px)

.cartControl
  position: absolute
  top: 0
  right: 0
  font-size: 0
  height: 30px


  .cart-decrease
    display: inline-block
    padding: 6px 3px 6px 6px

    .inner
      display: inline-block
      color: #f6c635

      &.size-18
        line-height: 18px
        font-size: 18px

      &.size-24
        line-height: 24px
        font-size: 24px

  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)

  .cart-add
    display: inline-block
    padding: 6px 3px 6px 6px
    color: #f6c635

    &.size-18
      line-height: 18px
      font-size: 18px

    &.size-24
      line-height: 24px
      font-size: 24px

</style>
