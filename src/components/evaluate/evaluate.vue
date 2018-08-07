<template>
  <div ref="evaluateWrap" class="evaluate-wrap">
        <div class="evaluate">
          <div class="score-content">
            <div class="score-left">
              <h1 class="title">{{seller.deliveryScore}}</h1>
              <span>商家评分</span>
            </div>
            <div class="star-score">
              <div class="score-taste">
                <span class="text">口味</span>
                <span><star :score="seller.foodScore" :size="24"></star></span>
                <span class="food-score-text">{{seller.foodScore}}</span>
              </div>
              <div class="score-taste">
                <span class="text">包装</span>
                <span><star :score="seller.serviceScore" :size="24"></star></span>
                <span class="food-score-text">{{seller.serviceScore}}</span>
              </div>
            </div>
            <div class="satisfaction">
              <h2 class="satisfaction-title">{{seller.satisfaction}}</h2>
              <span>配送满意度</span>
            </div>
          </div>
          <split></split>
          <div class="evaluate-content">
            <div class="evaluate-all">
              <span class="all" :class="{'all-active': allActive === 2}" @click="select(2)">全部</span><span class="all-img" :class="{'all-active': allActive === 3}" @click="select(3)">有图</span>
            </div>
            <div class="title-list">
              <span class="title" :class="{'title-active': selectType === 2}" @click="select(2)">全部 {{ratings.length}}</span>
              <span class="title" :class="{'title-active': selectType === 3}" @click="select(3)">有图 {{imgTitle.length}}</span>
              <span class="title" :class="{'title-active': selectType === 0}" @click="select(0)">满意 {{positiveTitle.length}}</span>
              <span class="title" :class="{'title-active': selectType === 1}" @click="select(1)">不满意 {{negativeTitle.length}}</span>
            </div>
          </div>
          <div class="ratings-wrap">
            <ul>
              <li class="rating-content border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType)">
                <div class="rating-img">
                  <img :src="rating.avatar" width="30" height="30">
                </div>
                <div class="rating-text">
                  <div class="title">{{rating.username}}</div>
                  <div class="rating-scroe">
                    <span>评分</span><span><star :size="24" :score="rating.score"></star></span>
                  </div>
                  <div class="rating-evaluate">{{rating.text}}</div>
                  <div v-show="rating.recommend.length" class="food-list">
                    <span class="icon-thumb_up"></span>
                    <span class="food-item" v-for="food in rating.recommend">{{food}}</span>
                  </div>
                  <div class="rating-imgs" v-show="rating.img">
                    <img :src="rating.img" width="60" height="60">
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
</template>

<script>
  import Star from '../star/star';
  import Split from '../split/split';
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const IMG = 3;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        allActive: 2
      }
    },
    methods: {

      // 判断评论要显示的内容
      needShow (type) {
        if(this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },

      select (type) {
        this.selectType = type;
        this.allActive = type === 3 ? 3 : 2
      }

    },
    computed: {
      imgTitle () {
        return this.ratings.filter((rating) => {
          return rating.rateType === IMG
        })
      },

      positiveTitle () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },

      negativeTitle () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }

    },
    components: {
      Star,
      Split
    },
    created () {
      this.$http.get('/api/ratings').then((res) => {
        if(res.data.errno === 0) {
          this.ratings = res.data.data;
          this.$nextTick(() => {
            if(!this.ratingsScroll) {
              this.ratingsScroll = new BScroll(this.$refs.evaluateWrap, {
                click: true
              })
            } else {
              this.ratingsScroll.refresh()
            }

          })
        }
      })
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style scoped lang="stylus">

@import "../../common/css/mixin.styl";

  .evaluate-wrap
    position: absolute
    width: 100%
    top: 171px
    bottom: 0
    overflow: hidden

    .evaluate
      padding: 15px 0
      background: #fff

      .score-content
        display: flex
        width: 100%
        margin-bottom: 10px

        .score-left
          padding: 0 15px
          width: 25%
          text-align: center

          @media only screen and (max-width: 320px)
            width: 20%
            padding: 0 5px

          .title
            font-size: 32px
            color: #ff9226
            padding-bottom: 8px

          & > span
            font-size: 12px
            color: rgba(7, 17, 27, .6)

        .star-score
          width: 45%
          padding-right: 15px

          @media only screen and (max-width: 320px)
            width: 50%
            padding-left: 10px


          .score-taste
            padding: 5px 0
            border-right: 1px solid rgba(7, 17, 27, .1)

            & > span
              display: inline-block
              padding-right: 7px
              vertical-align: center

            .text, .food-score-text
              font-size: 12px
              color: rgba(7, 17, 27, .6)
              height: 16px
              line-height: 16px

            .food-score-text
              color: #ff9226



        .satisfaction
          padding: 0 20px
          text-align: center
          margin-top: 8px
          color: rgba(7, 17, 27, .5)

          @media only screen and (max-width: 320px)
            padding: 0 10px

          .satisfaction-title
            font-size: 26px

          & > span
            font-size: 12px


      .evaluate-content
        padding: 15px 15px

        .evaluate-all
          width: 100%
          padding-bottom: 15px
          text-align: center

          & > span
            display: inline-block
            width: 100px
            height: 35px
            border: 1px solid #ffd163
            text-align: center
            line-height: 35px
            font-weight: 700
            font-size: 14px
            color: #ffb943

          .all
            border-radius: 5px 0 0 5px

          .all-img
            border-radius: 0 5px 5px 0

          .all-active
            background: #ffd163
            color: #000

        .title-list
          font-size: 0

          .title
            padding: 6px 10px
            background: rgba(7, 17, 27, .1)
            margin-right: 10px
            font-size: 12px
            color: rgba(7, 17, 27, .6)
            border-radius: 3px

          .title-active
            background: #f6faec;
            border: 1px solid #ffb943
            color: #ffb943




      .ratings-wrap
        padding: 15px

        ul
          .rating-content
            position: relative
            padding: 15px 0
            border-1px(rgba(7, 17, 27, .1))

            &:last-child
              border-none()


            .rating-img
              position: absolute

              & > img
                border: 1px solid rgba(7, 17, 27, .2)
                border-radius: 50%

            .rating-text
              margin-left: 43px

              .title
                font-size: 18px
                margin-bottom: 5px

              .rating-scroe
                font-size: 12px
                color: rgba(7, 17, 27, .6)

                & > span
                  display: inline-block
                  margin: 0 7px 10px 0

              .rating-evaluate
                font-size: 14px
                line-height: 18px
                margin-bottom: 10px

              .food-list
                font-size: 12px

                .food-item
                  display: inline-block
                  margin: 0 5px 5px 0
                  padding: 3px 6px
                  border: 1px solid rgba(7, 17, 27, .4)
                  border-radius: 3px
                  color: rgba(7, 17, 27, .4)

                .icon-thumb_up
                  margin-right: 5px
                  color: rgba(7, 17, 27, .4)

              .rating-imgs
                & > img
                  padding: 5px 0

              .time
                position: absolute
                top: 15px
                right: 10px
                font-size: 12px
                color: rgba(7, 17, 27, .4)


</style>
