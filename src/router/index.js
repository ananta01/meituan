import Vue from 'vue'
import Router from 'vue-router'
import Food from '../components/food/food'
import Merchant from '../components/merchant/merchant'
import Evaluate from '../components/evaluate/evaluate'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Food
    },
    {
      path: '/food',
      component: Food
    },
    {
      path: '/merchant',
      component: Merchant
    },
    {
      path: '/evaluate',
      component: Evaluate
    }
  ]
})
