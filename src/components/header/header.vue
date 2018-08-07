<template>
    <div class="header">
      <div class="header-content">
        <div class="avatar">
          <img :src="seller.avatar" width="78" height="78">
        </div>
        <div class="text-main">
          <h1 class="title">{{seller.name}}</h1>
          <div class="content-bulletin">公告：{{seller.bulletin}}</div>
          <ul>
            <li v-for="item in seller.label" class="label">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="back-img">
        <img :src="seller.avatar">
      </div>
      <div class="supports-wrap" v-if="seller.supports" @click.stop="showSupports">
        <div class="supports-content">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
          <div class="supports-count">{{seller.supports.length}}个活动</div>
          <i class="icon-keyboard_arrow_right"></i>
        </div>

      </div>

      <!--公告弹出层-->
      <transition name="fade">
        <div class="detail" v-show="isShowSupports" ref="detailWrap">
          <div class="notice-wrap">
            <div class="avatar">
              <img :src="seller.avatar" width="80" height="80">
            </div>
            <h1 class="title">{{seller.name}}</h1>
            <ul class="supports-list" v-if="seller.supports">


              <li class="supports-item" @click="showSupportsItem">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
                <span class="supports-count">{{isSupports.text}}{{seller.supports.length}}个活动</span>
                <span class="icon-keyboard_arrow_right"></span>
              </li>

              <transition-group name="fade">
                <li v-show="isSupports.show" v-for="(item, index) in seller.supports" class="supports-item" v-if="index !== 0" :key="index">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </transition-group>


            </ul>
            <div class="label-list">
              <h2 class="label-title">印象墙</h2>
              <ul>
                <li v-for="item in seller.label" class="label-text">{{item}}</li>
              </ul>
            </div>
            <div class="delivery-info">
              <h1 class="info-title">配送</h1>
              <div class="minPrice">
                <span class="price">起送:￥{{seller.minPrice}}</span>
                <span class="line">|</span>
                <span class="shipping">{{seller.shipping === 0 ? "免配送费" : "配送费：￥" + seller.shipping}}</span>
                <span class="line">|</span>
                <span class="time">{{seller.deliveryTime}}分钟</span>
              </div>
              <div class="shipping-time">
                <span>配送时间:</span>
                <span>{{seller.shippingTime}}</span>
              </div>
            </div>
            <div class="notice">
              <h2 class="notice-title">公告</h2>
              <p class="text">{{seller.bulletin}}</p>
            </div>
            <div class="close" @click="showSupports">
              <i class="icon-close"></i>
            </div>
          </div>
          <img class="backimg" :src="seller.avatar" @click="showSupports">
        </div>
      </transition>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        isShowSupports: false,
        isSupports: {
          show: false,
          text: '展开'
        }
      }
    },
    methods: {
      showSupports () {
        this.isShowSupports = !this.isShowSupports;

        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.detailWrap, {
            click: true
          })
        })
      },

      showSupportsItem () {
        this.isSupports.show = !this.isSupports.show;
        this.isSupports.text = this.isSupports.text === '展开' ? '收起' : '展开';
      }
    },
    computed: {},
    components: {},
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    }
  }
</script>

<style scoped lang="stylus">

@import "../../common/css/mixin.styl"

    .fade-enter-active
      transition: all .7s ease

    .fade-leave-active
      transition: all .5s ease

    .fade-enter, .fade-leave-active
      opacity: 0



  .header
    position: relative
    overflow: hidden


    .header-content
      position: relative
      height: 88px
      display:flex
      font-size: 0
      color: #fff
      background: rgba(7, 17, 27, .3)


      .avatar
        flex: 0 0 64px
        padding: 18px 12px 12px 12px

        img
          border-radius: 5px

      .text-main
        flex: 1
        margin-top: 18px
        width: 100%
        line-height: 18px
        font-size: 16px
        overflow: hidden

        .title
          font-weight: 700


        .content-bulletin
          font-size: 12px
          margin: 3px 0 5px
          width: 95%
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          color: rgba(255, 255, 255, .8)

        ul
          width: 95%

          .label
            display: inline-block
            font-size: 12px
            margin-right: 7px
            padding: 2px 6px
            border: 1px solid rgba(255, 255, 255, .4)
            border-radius: 6px

    .back-img
      position: absolute
      height: 88px
      width: 100%
      top: 0
      left: 0
      z-index: -1
      filter: blur(10px)
      overflow: hidden


    .supports-wrap
      padding: 20px 12px 0 12px
      background: #fff
      font-style: 0

      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        background-size: 12px 12px
        background-repeat: no-repeat
        back

        &.decrease
          bg-image('decrease_1')
        &.discount
          bg-image('discount_1')
        &.guarantee
          bg-image('guarantee_1')
        &.invoice
          bg-image('invoice_1')
        &.special
          bg-image('special_1')

      .text
        display: inline-block
        vertical-align: top
        width: 70%
        font-size: 12px
        overflow: hidden

      .supports-count
        display: inline-block
        vertical-align: top
        padding-left: 5px
        font-size: 12px
        color: rgba(7, 17, 27, .5)

      .icon-keyboard_arrow_right
        display: inline-block
        vertical-align: top
        font-size: 12px
        color: rgba(7, 17, 27, .5)

    .detail
      position: fixed
      width: 100%
      height: 100%
      z-index: 99


      .backimg
        position: fixed
        z-index: 100
        top: 0
        left: 0
        width: 200%
        height: 200%
        filter: blur(10px)
        overflow: hidden

      .notice-wrap
        position: fixed
        padding: 30px 10px 20px
        z-index: 120
        left: 0
        bottom: 0
        width: 100%
        background: #fff


        .avatar
          position: absolute
          top: -60px
          left: 50%
          margin-left: -50px

          img
             border-radius: 5px

        .title
          line-height: 26px
          text-align: center
          font-size: 20px
          font-weight: 700
          padding-bottom: 10px

        .supports-list
          position: relative
          margin-top: 5px

          .icon
            display: inline-block
            padding: 2px
            border-radius: 3px
            border: 1px solid rgba(7, 17, 27, .2)
            vertical-align: top
            width: 14px
            height: 14px
            line-height: 25px
            background-size: 18px 18px
            background-repeat: no-repeat


            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')


          .text
            display: inline-block
            line-height: 20px
            margin-bottom: 3px
            vertical-align: top
            font-size: 14px

          .supports-count
            position: absolute
            right: 45px
            display: inline-block
            vertical-align: top
            padding-left: 35px
            font-size: 12px
            line-height: 20px
            color: rgba(7, 17, 27, .5)

          .icon-keyboard_arrow_right
            position: absolute
            right: 30px
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 20px
            color: rgba(7, 17, 27, .5)

        .label-list
          padding: 20px 0

          .label-title
            font-size: 18px

          .label-text
            display: inline-block
            font-size: 12px
            margin: 10px 7px 0 0
            padding: 4px 8px
            border: 1px solid rgba(7, 17, 27, .3)
            border-radius: 6px

        .delivery-info
          padding-bottom: 20px
          font-size: 14px
          color: rgba(7, 17, 27, .6)

          .info-title
            font-size: 18px
            color: #242424

          .minPrice
            margin: 10px 0 5px 0

            .line
              padding: 0 1px
              font-size: 10px
              line-height: 18px


        .notice
          width: 95%

          .notice-title
            font-size: 18px
            padding-bottom: 10px

          p.text
            padding-bottom: 15px
            font-size: 14px
            color: rgba(7, 17, 27, .6)
            line-height: 18px


        .close
          position: relative
          width: 100%
          text-align: center
          margin: 5px 0 5px -5px

          .icon-close
            width: 32px
            height: 32px
            mt-10
            clear: both
            font-size: 32px
            color: rgba(7, 17, 27, .4)


</style>
