<template>
<v-app>
  <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
    <v-list>
      <v-list-tile value="true" v-for="(item, i) in items" :key="i">
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar app :clipped-left="clipped">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
    </v-btn> -->
    <!-- <v-btn icon @click.stop="clipped = !clipped">
      <v-icon>web</v-icon>
    </v-btn>
    <v-btn icon @click.stop="fixed = !fixed">
      <v-icon>remove</v-icon>
    </v-btn> -->

    <v-avatar size="20px">
      <img src="./assets/nav6.png" alt="John">
    </v-avatar>
    <v-toolbar-title v-text="title" style="font-size:16px"></v-toolbar-title>
    <v-spacer></v-spacer>
    <transition name="fade">
      <v-layout row align-center style="max-width: 320px" v-show="searchShow" class="search">
        <v-text-field placeholder="Search..." single-line append-icon="search" :append-icon-cb="() => {}" color="teal" hide-details></v-text-field>
      </v-layout>
    </transition>
    <v-btn icon @click.stop="_searchBtn" v-show="searchBtn" style="margin:0px 0px 2px 0px">
      <v-icon>search</v-icon>
    </v-btn>

    <!-- <v-avatar class="indigo" size="24px">
      <v-icon dark>search</v-icon>
    </v-avatar> -->
  </v-toolbar>
  <div @click="hideSearchBar" style="height:100%">
    <v-content>
      <router-view/>
    </v-content>
  </div>

  <v-footer :fixed="fixed" app :style="{paddingLeft: drawer?'300px':'0px', zIndex:2}">
    <span style="text-align:center;width:100%;">&copy; 2018</span>
  </v-footer>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      searchShow: true,
      searchBtn: false,
      items: [{
        icon: 'bubble_chart',
        title: '管理系统'
      }],
      miniVariant: false,
      right: true,
      title: 'Admin'
    }
  },
  created() {
    if (this._isMobile()) {
      //手机端
      this.drawer = false;
      this.searchShow = false;
      this.searchBtn = true;
    } else {
      // pc端
      this.drawer = true;
      this.searchShow = true;
      this.searchBtn = false;
    }
  },
  mounted() {
    window.onresize = () => {
      let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
      if (screenWidth < 420) {
        this.searchShow = false;
        this.searchBtn = true;
      } else {
        this.searchShow = true;
        this.searchBtn = false;
      }
    }

  },
  computed: {

  },
  methods: {
    // 判断pc / m
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    _searchBtn() {
      this.searchBtn = false;
      this.searchShow = true;
    },
    hideSearchBar() {
      if (this._isMobile()) {
        //手机端
        this.searchShow = false;
        this.searchBtn = true;
      }
    }
  }
}
</script>
<style>
.search {
  transform: translate3d(0, 0, 0);
}

.search.fade-enter-active,
.search.fade-leave-active {
  transition: all 0.2s linear;
}

.search.fade-enter,
.search.fade-leave-active {
  transform: translate3d(100%, 0, 0);
}
</style>
