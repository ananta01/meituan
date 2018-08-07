<template>
  <div class="food-wrap">
    <div class="food">
      <div class="food-scroll" ref="foodContent">
        <div class="sidebar">
          <div class="sidebar-wrap">
            <ul class="sidebar-list">
              <li class="food-item" :class="{'current': currentIndex===index}" v-for="(good,index) in goods"
                  @click="selectMenu(index)">
                <span class="text"><span class="icon" :class="classMap[good.type]" v-if="good.type>0"></span>{{good.name}}</span>
              </li>
            </ul>
            <div class="foods-wrap" ref="foodsScroll">
              <ul>
                <li v-for="item in goods" class="food-list-hook">
                  <h2 class="foods-title">{{item.name}}</h2>
                  <ul>
                    <li v-for="food in item.foods" class="food-item">
                      <div class="icon">
                        <img :src="food.icon" width="80" height="80">
                      </div>
                      <div class="content">
                        <h2 class="food-title">{{food.name}}</h2>
                        <div class="desc" v-show="food.description">{{food.description}}</div>
                        <div class="extra">
                          <span class="count">月售{{food.sellCount}}</span>
                          <span>赞{{food.rating}}</span>
                        </div>
                        <div class="price">
                          <span class="new-price">￥{{food.price}}</span>
                          <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                        </div>
                        <div class="food-cart-count">
                          <cart-control :food="food" :size="24"></cart-control>
                        </div>

                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shop-cart :delivery-price="seller.deliveryPrice"
               :min-price="seller.minPrice" :select-foods="selectFoods" :reach-shop="seller.reachShop"
               ref="shopcart" ></shop-cart>
  </div>
</template>

<script>

  import BScroll from 'better-scroll';
  import Sign from '../sign/sign';
  import CartControl from '../cartControl/cartControl';
  import ShopCart from '../shopCart/shopCart';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        signs: [],
        goods: [],
        listHeight: [],
        scrollY: 0,
        foodScrollY: 0,
        foodsWrapScrollY: 0
      }
    },
    methods: {
      selectMenu (index) {
        let foodList = this.$refs.foodsScroll.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsWrapScroll.scrollToElement(el, 300);
      },

      _initNav () {
        this.$nextTick(() => {
          this.foodScroll = new BScroll(this.$refs.foodContent, {
            click: true,
            bounce: false,
            probeType: 3
          });

            this.foodsWrapScroll = new BScroll(this.$refs.foodsScroll, {
              probeType: 3
            });
            this.foodsWrapScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y));
            });
          }


        )
      },


      // 把每个类目的商品高度算出来
      _foodsListHeight () {
          let foodList1 = this.$refs.foodsScroll.getElementsByClassName('food-list-hook');
          let height = 0;
          this.listHeight.push(height);
          for(let i = 0; i < foodList1.length; i++) {
            let item = foodList1[i];
            height += item.clientHeight;
            this.listHeight.push(height)
          }
      },

      // 遍历所有评论
      allEvaluate () {
        let count = 0;
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            count += food.ratings.length;
          })
        });
        this.$emit('all-evaluate', count);
        return count;
      }

    },
    computed: {
      currentIndex () {
        for(let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0
      },

      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count) {
              foods.push(food);
            }
          })
        });
        return foods;
      }

    },
    components: {
      Sign,
      CartControl,
      ShopCart
    },
    created () {

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http('/api/sign').then((res) => {
        if(res.data.errno === ERR_OK) {
          this.signs = res.data.data;
        }
      });

      this.$http('/api/goods').then((res) => {
        if(res.data.errno === ERR_OK) {
          this.goods = res.data.data;
          this.$nextTick(() => {
            this._initNav();
            this._foodsListHeight();
            this.allEvaluate();
          })
        }
      });

    },
    mounted () {}

  }
</script>

<style scoped lang="stylus">

  @import "../../common/css/mixin.styl"

  .food
    display: flex
    position: absolute
    top: 172px
    bottom: 50px
    width: 100%
    background: #fff

    .food-scroll
      width: 100%
      overflow: hidden

      .sidebar
        width: 100%

        .sidebar-wrap
          position: relative
          display: flex
          overflow: hidden

          .sidebar-list
            flex: 0 0 90px
            width: 90px


            .food-item
              display: table
              height: 60px
              width: 66px
              padding: 0 12px
              font-size: 12px
              color: rgba(7, 17, 27, .6)
              background: #f6f8fa
              &.current
                background: #fff
                color: rgba(7, 17, 27, .8)

              &.food-active
                background: #fff
                color: rgba(7, 17, 27, .8)

              &:last-child
                padding-bottom: 15px

              .text
                display: table-cell
                vertical-align: middle
                line-height: 14px
                font-size: 12px
                text-align: center

                .icon
                  display: inline-block
                  padding-right: 3px
                  line-height: 12px
                  width: 12px
                  height: 12px
                  background-size: 12px 12px
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



          .foods-wrap
            flex: 1


            & > ul
              width: 100%
              overflow: hidden
              position: absolute
              padding: 0 10px


              .foods-title
                line-height: 14px
                font-size: 14px
                padding: 15px 10px 0

              ul
                margin-right: 18px


                .food-item
                  position: relative
                  width: 100%
                  display: flex
                  margin: 18px 18px 0 0
                  overflow: hidden


                  .icon
                    flex: 0 0 90px
                    display: inline-block
                    width: 90px

                  .content
                    width: 100%
                    margin-right: 15px
                    overflow: hidden



                    .food-title
                      width: 70%
                      margin-bottom: 6px
                      overflow: hidden
                      white-space: nowrap
                      text-overflow: ellipsis
                      font-size: 16px
                      font-weight: 700

                    .desc
                      width: 65%
                      margin-bottom: 6px
                      overflow: hidden
                      white-space: nowrap
                      text-overflow: ellipsis
                      font-size: 12px
                      color: rgba(7, 17, 27, .5)

                    .extra
                      font-size: 12px
                      color: rgba(7, 17, 27, .5)

                      .count
                        margin-right: 10px

                    .price
                      margin-top: 10px
                      font-size: 12px


                      .new-price
                        font-size: 16px
                        font-weight: 700
                        color: rgba(255,43,0,0.78)
                        margin-right: 10px

                      .old-price
                        color: rgba(7, 17, 27, .5)
                        text-decoration: line-through


                    .food-cart-count
                      position: absolute
                      right: 100px
                      top: 50px
                      width: 100px
                      height: 60px





</style>
