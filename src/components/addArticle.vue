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
            <v-text-field label="关键词" v-model="keywords" :rules="[v => !!v || '请输入关键词']" required></v-text-field>
            <v-text-field label="文章描述" v-model="describae" :rules="[v => !!v || '请输入文章描述']" required></v-text-field>
            <div>
              <v-btn color="blue-grey" class="white--text" style="margin-left:0" @click="clickFile">
                选择图片
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
              <span>{{fileName}}</span>
              <input type="file" ref="getFile" v-show="hideFile" name="file" class="upload__input" @change="uploadChange" accept="image/*">
              <br>
              <v-divider></v-divider>
              <div class="imgSrc">
                <span style="white-space:pre;"> </span><img :src="files">
              </div>
            </div>
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
        <v-form ref="form1" lazy-validation>
          <v-card-text>
            <v-select label="文章分类" v-model="columns" :items="types" :rules="[v => !!v || '请选择分类']" required></v-select>
          </v-card-text>
        </v-form>
        <v-card-text>
          <v-btn color="success" @click="submit" :disabled="!valid">发布</v-btn>
          <v-btn @click="clear">清除</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-snackbar top="top" v-model="snackbar" color="success">
      文章添加成功！
      <v-btn flat @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </v-layout>
</v-container>
</template>

<script>
import {
  VueEditor
} from 'vue2-editor'

export default {
  data() {
    return {
      valid: true,
      snackbar: false,
      hideFile: false,
      title: '',
      fileName: '',
      keywords: '',
      contents: '',
      describae: '',
      columns: null,
      files: '',
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
    clickFile() {
      this.$refs.getFile.dispatchEvent(new MouseEvent('click'));
    },
    uploadChange(event) {
      if (event.target.files.length > 0) {
        this.files = event.target.files[0]; //提交的图片
        this.getBase64(event.target, (url) => {
          this.files = url; //显示的图片
          // console.log(this.files);
        });
      }
    },
    getBase64(file, callback) {
      var maxWidth = 640;

      if (file.files && file.files[0]) {
        var thisFile = file.files[0];
        this.fileName = thisFile.name;
        if (thisFile.size > 2019200) {
          // mualert.alertBox("图片不能超过800K");
          alert("图片不能超过2M");
          return
        };
        var reader = new FileReader();
        reader.onload = function(event) {
          var imgUrl = event.target.result;
          callback(imgUrl);
        }
        reader.readAsDataURL(file.files[0]);
      }
    },
    submit() {
      let _this = this;
      if (this.$refs.form.validate() && this.$refs.form1.validate()) {
        // console.log(this.contents);
        // if (this.contents == '') {
        //   console.log("空");
        // }
        _this.$http.post('/addArticle', {
            title: _this.title,
            keywords: _this.keywords,
            files: _this.files,
            contents: _this.contents,
            describae: _this.describae,
            columns: _this.columns
          })
          .then(function(res) {
            _this.snackbar = true;
            _this.clear();
            _this.contents = '';
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    clear() {
      this.$refs.form.reset();
      this.$refs.form1.reset();
    }
  },
  components: {
    VueEditor
  }
}
</script>
<style>
#editor {
  height: 300px;
}

#testing {
  /* display: none; */
}
</style>
