<template>
<v-app>
  <v-navigation-drawer width="220" mobile-break-point="720" dark persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>

    <v-list class="pa-1">
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img src="./assets/nav6.png" width="100%">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>hello Hi
            <router-link to="/" style="float:right" active-class="link-active" title="首页">
              <v-icon>home</v-icon>
            </router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider light></v-divider>
    <v-expansion-panel focusable>
      <v-expansion-panel-content v-for="(item,i) in meuns" :key="i" :value="i===0">
        <div slot="header">
          <v-icon>{{item.icon}}</v-icon>
          <span style="margin-left:8px;">{{item.name}}</span>
        </div>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <div v-for="(items,i) in item.menusItem" :key="i">
            <router-link class="nav" :to="items.url">{{ items.title }}</router-link>
          </div>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-navigation-drawer>

  <v-card color="grey lighten-4" flat tile>
    <v-toolbar dense prominent extended app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-avatar size="20px">
        <img src="./assets/nav6.png" alt="John">
      </v-avatar>
      <v-toolbar-title v-text="title" style="font-size:16px"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text" slot="extension" style="margin-left: 0px">
        <!-- <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item to="/">首页</v-breadcrumbs-item>
          <v-breadcrumbs-item v-for="(item,i) in meuns" :key="i" :disabled="item.disabled">
            {{ item.name }}
          </v-breadcrumbs-item>
        </v-breadcrumbs> -->
      </v-toolbar-title>
    </v-toolbar>

  </v-card>
  <v-content>
    <router-view />
  </v-content>

  <v-footer :fixed="fixed" app :style="{paddingLeft: drawer?'220px':'0px', zIndex:2}">
    <span style="text-align:center;width:100%;">{{title}}&copy; {{ new Date().getFullYear() }}</span>
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
      // searchShow: true,
      // searchBtn: false,
      meuns: [{
          "name": "数据管理",
          "icon": "list",
          "menusItem": [{
              "url": "/Home",
              "title": "数据列表"
            },
            {
              "url": "/Home2",
              "title": "图片列表"
            },
            {
              "url": "/Home3",
              "title": "作者管理"
            }
          ]
        },
        {
          "name": "文章管理",
          "icon": "account_circle",
          "menusItem": [{
              "url": "/addArticle",
              "title": "新增文章"
            },
            {
              "url": "/dataTable2",
              "title": "文章列表2"
            },
            {
              "url": "/dataTable3",
              "title": "文章列表3"
            }
          ]
        },
        {
          "name": "人脉管理",
          "icon": "settings_phone",
          "menusItem": [{
              "url": "/List1",
              "title": "人脉列表1"
            },
            {
              "url": "/List2",
              "title": "人脉列表2"
            },
            {
              "url": "/List3",
              "title": "人脉列表3"
            }
          ]
        }
      ],
      miniVariant: false,
      right: true,
      title: '深圳市先施公司'
    }
  },
  created() {
    if (this._isMobile()) {
      //手机端
      this.drawer = false;
    } else {
      // pc端
      this.drawer = true;
    }
  },
  mounted() {},
  computed: {

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
<style scoped>
.expansion-panel__container--active,
.expansion-panel__container:hover {
  background-color: rgba(0, 0, 0, .7) !important;
}

.nav {
  display: block;
  height: 40px;
  line-height: 40px;
  padding-left: 60px;
  color: #fff;
  text-decoration: none;
}

.router-link-active,
.nav:hover {
  background: #009688;
  transition: all 0.5s;
}

.router-link-exact-active.link-active .icon {
  color: #009688;
}
</style>
