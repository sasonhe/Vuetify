<template>
<v-container fluid grid-list-md>
  <v-card>
    <v-card-title>
      <v-layout row wrap>
        <v-flex md6>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-flex>

      </v-layout>
      <v-spacer></v-spacer>
      <v-btn color="error" style="margin-right:0;" :disabled="!valid">删除选中</v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table v-model="selected" :search="search" :headers="headers" :items="desserts" :rows-per-page-items="pageitems" rows-per-page-text="每页行数" no-data-text="暂无数据" :pagination.sync="pagination" select-all item-key="title" class="elevation-1">
      <template slot="headers" slot-scope="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.native="toggleAll"
            ></v-checkbox>
          </th>
          <th class="text-xs-left">ID</th>
          <!-- <th
            class="text-xs-left"
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >

            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th> -->
          <th class="text-xs-left">文章标题</th>
          <th class="text-xs-left">文章分类</th>
          <th
          class="text-xs-left"
          @click="toggleOrder"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', props.headers.value === pagination.sortBy ? 'active' : '']"
          >
          <v-icon small>arrow_upward</v-icon>
          创建日期
        </th>
          <th class="text-xs-left">操作</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            <v-checkbox
              v-model="props.selected"
              @change="checkItems"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.columns }}</td>
          <td class="text-xs-left">{{ props.item.date | formatDatetwo }}</td>
          <td class="text-xs-left px-0">
          <v-btn icon class="mx-0" >
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteShow(props.item.id,props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
          </td>
        </tr>

      </template>
      <template slot="pageText" slot-scope="props">
     {{ props.pageStart }} - {{ props.pageStop }} 共 {{ props.itemsLength }}条
   </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        关键词 "{{ search }}" 未找到
      </v-alert>
    </v-data-table>
  </v-card>
  <!-- 删除弹框 -->
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline text-xs-center">您要确定删除吗?</v-card-title>
        <!-- <v-card-text>删除后数据不可恢复</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" small flat="flat" @click.native="dialog = false">取消</v-btn>
          <v-btn color="info darken-1" small @click="deleteItem">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      dialog: false,
      deleteId: '',
      deleteNum: '',
      pagination: {
        sortBy: 'date'
      },
      pageitems: [10, 15, 20, {
        "text": "All",
        "value": -1
      }],
      selected: [],
      search: '',
      headers: [{
          text: '文章标题',

          value: 'title'
        },
        {
          text: '文章分类',
          value: 'columns'
        },
        {
          text: '创建日期',
          value: 'date'
        }
      ],
      desserts: []
    }
  },
  created() {
    let _this = this;
    _this.$http.get('/articleList')
      .then(function(res) {
        _this.desserts = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    toggleOrder() {
      this.pagination.descending = !this.pagination.descending;
    },
    toggleAll() {
      if (this.selected.length) {
        this.selected = [];
        this.valid = false;
      } else {
        this.selected = this.desserts.slice();
        this.valid = true;
      }
    },
    checkItems() {
      if (this.selected.length) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    },
    deleteShow(id, num) {
      let _this = this;
      _this.deleteId = id;
      _this.deleteNum = num;
      _this.dialog = true;

    },
    deleteItem() {
      let _this = this;
      _this.$http.get('/deleteArticle', {
          params: {
            'id': _this.deleteId
          }
        })
        .then(function(res) {
          let num = _this.deleteNum;
          if (res.data.status == 200) {
            const index = _this.desserts.indexOf(num);
            _this.desserts.splice(index, 1);
            _this.dialog = false;
          }
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  filters: {
    formatDatetwo(time) {
      var re = /-?\d+/;
      var m = re.exec(time);
      var d = new Date(parseInt(m[0]));
      var o = {
        "M+": d.getMonth() + 1, //month
        "d+": d.getDate(), //day
        "h+": d.getHours(), //hour
        "m+": d.getMinutes(), //minute
        "s+": d.getSeconds(), //second
        "q+": Math.floor((d.getMonth() + 3) / 3), //quarter
        "S": d.getMilliseconds() //millisecond
      }
      var format = "yyyy-MM-dd hh:mm";
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
  }
}
</script>
