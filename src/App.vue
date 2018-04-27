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

    <v-avatar size="36px">
      <img src="./assets/nav6.png" alt="John">
    </v-avatar>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout row align-center style="max-width: 320px">
      <v-text-field placeholder="Search..." single-line append-icon="search" :append-icon-cb="() => {}" color="teal" hide-details></v-text-field>
    </v-layout>
  </v-toolbar>
  <v-content>
    <router-view/>
  </v-content>
  <v-footer :fixed="fixed" app>
    <span>&copy; 2017</span>
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
      // alert("手机端");
      this.drawer = false;
    } else {
      // alert("pc端");
      this.drawer = true;
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    // 判断pc / m
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  }
}
</script>
