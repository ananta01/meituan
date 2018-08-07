<template>
  <div id="app">
    <my-header :seller="seller"></my-header>
    <div class="nav border-1px">
      <span class="food">
        <router-link :to="{ path: '/food' }">点菜</router-link>
      </span>
      <span class="evaluate">
        <router-link :to="{ path: '/evaluate' }">评价({{evaluate}})</router-link>
      </span>
      <span class="merchant">
        <router-link :to="{ path: '/merchant' }">商家</router-link>
      </span>
    </div>
    <keep-alive>
      <router-view :seller="seller" @all-evaluate="allEvaluate"></router-view>
    </keep-alive>

  </div>
</template>

<script>

  import MyHeader from './components/header/header';

  const ERR_OK = 0;

export default {
  data () {
    return {
      seller: {},
      evaluate: 0
    }
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      if(res.data.errno === ERR_OK) {
          this.seller = res.data.data;
      }
    });
  },
  components: {
    MyHeader
  },
  methods: {
    allEvaluate (num) {
      this.evaluate = num;
    }
  }
}
</script>

<style lang="stylus">

@import "common/css/mixin.styl"

#app
  overflow: hidden
  .nav
    display: flex
    padding-top: 10px
    line-height: 38px
    font-size: 18px
    color: rgba(7, 17, 27, .8)
    border-1px(rgba(7, 17, 27, .1))
    background: #fff


    & > span
      flex: 1
      text-align: center
      & > a
        display: block

        &.active
          font-weight: 700
          color: rgba(255,43,0,0.78)




</style>
