<template>
    <div class="sign">
        <h1 class="title">店铺招牌</h1>
        <div class="sign-list clearfix" ref="signList">
          <ul class="sign-ul" ref="signUl">
            <li class="sign-item" v-for="sign in signs">
              <div class="sign-img">
                <img :src="sign.icon" width="110" height="110">
              </div>
              <div class="sign-content">
                <h1 class="sign-title">{{sign.name}}</h1>
                <div class="sign-price">
                  <span class="price">￥{{sign.price}}</span><span class="cartCount"><cart-control :food="sign" :size="18"></cart-control></span>
                </div>
              </div>
              <div class="desc">
                <span>{{sign.description}}</span>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>

  import BScroll from 'better-scroll';
  import CartControl from '../cartControl/cartControl';

  export default {
    props: {
      signs: {
        type: Array
      }
    },
    data() {
      return {
      }
    },
    methods: {
      _initSign () {
        if(this.signs) {
          let imgWidth = 110;
          let imgMargin = 12;
          let allWidth = (imgWidth + imgMargin) * this.signs.length;
          this.$refs.signUl.style.width = allWidth + 'px';

          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.signList, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            }
          })
        }
      }
    },
    computed: {},
    components: {
      CartControl
    },
    mounted () {
      this._initSign()
    },
    watch: {
      signs () {
        this._initSign()
      }
    }

  }
</script>

<style scoped lang="stylus">
  .sign
    width: 100%
    height: 215px
    padding: 5px 5px 5px 10px
    overflow: hidden
    background: #fff



    .title
      line-height: 24px
      font-size: 14px
      padding-bottom: 8px

    .sign-list
      position: absolute
      width: 100%
      white-space: nowrap
      overflow: hidden

      .sign-ul
        overflow: hidden
        .sign-item
          position: relative
          display: inline-block
          margin-right: 10px
          border: 1px solid rgba(7, 17, 27, .1)
          box-shadow: 1px 1px 2px rgba(7, 17, 27, .1)
          border-radius: 5px
          &:last-child
            margin-right: 0

          .sign-img
            width: 110px


          .sign-content
            padding: 5px 0 5px 5px

            .sign-title
              margin-bottom: 8px
              font-size: 14px
              width: 90%
              overflow: hidden

            .sign-price
              position: relative
              height: 30px
              line-height: 30px
              padding-bottom: 3px
              font-size: 16px


              .cartCount

              .price
                display: inline-block
                font-weight: 700
                color: rgba(255,43,0,0.78)



          .desc
            position: absolute
            padding: 4px 6px
            top: 84px
            left: 0
            font-size: 10px
            background: #3a473a

            & > span
              color: #e2c453




</style>
