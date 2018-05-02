<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex md8>
      <v-card>
        <v-card-title>
          <h4>新增文章</h4></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="文章标题" v-model="title" :rules="[v => !!v || '请输入文章标题']" required></v-text-field>
            <v-text-field label="文章描述" v-model="describae" :rules="[v => !!v || '请输入文章描述']" required></v-text-field>
            <v-select label="文章分类" v-model="columns" :items="types" :rules="[v => !!v || '请选择分类']" required></v-select>

            <VueEditor ref="myTextEditor" id="editor" v-model="contents" placeholder="文章内容"></VueEditor>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md4>
      <v-card>
        <v-card-title>
          <h4>发布文章</h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-btn color="success" @click="submit" :disabled="!valid">发布</v-btn>
          <v-btn @click="clear">清除</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import {
  VueEditor
} from 'vue2-editor';
export default {
  data() {
    return {
      valid: true,
      title: '',
      contents: '',
      describae: '',
      columns: null,
      types: [
        '文章分类1',
        '文章分类2',
        '文章分类3',
        '文章分类4'
      ],
      regInfo: {}
    }
  },

  methods: {
    submit() {
      let _this = this;
      if (this.$refs.form.validate()) {
        // console.log(this.contents);
        // if (this.contents == '') {
        //   console.log("空");
        // }
        _this.$http.post('/addArticle', {
          title: _this.title,
          contents: _this.contents,
          describae: _this.describae,
          columns: _this.columns
        }).then((res) => {
          if (res.status == 200) {
            _this.regInfo = res.data;
            if (_this.regInfo.status == 1) {
              console.log(_this.regInfo.status);
            } else {
              alert('注册失败');
            }
          } else {
            alert('出现错误');
          }
          console.log(res);
        }, (err) => {
          console.log(err);
        });


      }
    },

    clear() {
      this.$refs.form.reset()
    }

  },
  components: {
    // quillEditor,
    VueEditor
  }
}
</script>
<style>
#editor {
  height: 300px;
}
</style>
