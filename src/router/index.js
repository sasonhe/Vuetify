import Vue from 'vue'
import Router from 'vue-router'
import addArticle from '@/components/addArticle'
import Home from '@/components/Home'
import dataTable from '@/components/dataTable'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'addArticle',
      component: addArticle
    },

    {
      path: '/dataTable',
      name: 'dataTable',
      component: dataTable
    }
  ]
})