<template>
    <div class="merchant" ref="merchant">
      <div class="merchant-wrap">
        <split></split>
        <div class="home-wrap">
          <div class="home border-1px">
            <span class="">地址：{{seller.home}}</span>
          </div>
          <div class="text">
            <span class="text-content">查看食品安全档案</span><span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>
        <split></split>
        <div class="home-wrap">
          <div class="home border-1px">
            <span class="">配送服务：{{seller.distributionServer}}</span>
          </div>
          <div class="text">
            <span class="text-content">配送时间：{{seller.distributionServerTime}}</span><span></span>
          </div>
        </div>
        <split></split>
        <div class="home-wrap">
          <div class="home notice border-1px">
            <span class="text-content"><span class="bulletin">公告：</span>{{seller.bulletin}}</span>
          </div>
          <div class="supports-wrap">
            <div v-for="(item, index) in seller.supports" class="supports-item">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  import BScroll from 'better-scroll';
  import Split from '../split/split';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {}
    },
    methods: {},
    computed: {},
    components: {
      Split
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$nextTick(() => {
        this.merchantScroll = new BScroll(this.$refs.merchant, {
          click: true
        })
      })
    }
  }
</script>

<style scoped lang="stylus">

@import "../../common/css/mixin.styl";

.merchant
  position: absolute
  top: 171px
  bottom: 0
  overflow: hidden

  .merchant-wrap
    background: #fff

    .home-wrap
      padding: 0 10px
      font-size: 14px
      color: rgba(7, 17, 27, .8)

      .home
        border-1px(rgba(7, 17, 27, .1))

        & > span
          line-height: 20px
          display: inline-block
          padding: 20px 0

        .bulletin
          color: #fe4b46
          font-weight: 700

      .text
        position: relative

        .text-content
          line-height: 22px
          display: inline-block
          padding: 20px 0

        .icon-keyboard_arrow_right
          position: absolute
          right: 0
          top: 18px
          font-size: 24px
          color: rgba(7, 17, 27, .3)


      .supports-wrap
        padding: 10px 0

        .supports-item
          padding: 5px
          .icon
            display: inline-block
            padding: 2px
            border-radius: 3px
            vertical-align: top
            width: 14px
            height: 14px
            line-height: 25px
            background-size: 18px 18px
            background-repeat: no-repeat


            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')


          .text
            display: inline-block
            line-height: 20px
            margin-bottom: 3px
            vertical-align: top
            font-size: 14px

</style>
