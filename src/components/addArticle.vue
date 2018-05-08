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
              <input type="file" name="file" class="upload__input" @change="uploadChange" accept="image/png,image/gif">
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
      title: '',
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
    uploadChange(event) {
      if (event.target.files.length > 0) {
        this.files = event.target.files[0]; //提交的图片
        // console.log(this.files);
        this.getBase64(event.target, (url) => {
          this.files = 'data:image/png;base64,' + url; //显示的图片
        });
      }
    },
    getBase64(file, callback) {
      var maxWidth = 640;
      if (file.files && file.files[0]) {
        var thisFile = file.files[0];
        if (thisFile.size > 2019200) {
          // mualert.alertBox("图片不能超过800K");
          alert("图片不能超过2M");
          return
        };
        var reader = new FileReader();
        reader.onload = function(event) {
          var imgUrl = event.target.result;
          // console.log(imgUrl);
          var img = new Image();
          img.onload = function() {
            var canvasId = 'canvasBase64Imgid',
              canvas = document.getElementById(canvasId);
            if (canvas != null) {
              document.body.removeChild(canvas);
            }
            var canvas = document.createElement("canvas");
            canvas.innerHTML = 'New Canvas';
            canvas.setAttribute("id", canvasId);
            canvas.style.display = 'none';
            document.body.appendChild(canvas);
            canvas.width = this.width;
            canvas.height = this.height;
            var imageWidth = this.width,
              imageHeight = this.height;
            if (this.width > maxWidth) {
              imageWidth = maxWidth;
              imageHeight = this.height * maxWidth / this.width;
              canvas.width = imageWidth;
              canvas.height = imageHeight;
            }
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, imageWidth, imageHeight);
            context.drawImage(this, 0, 0, imageWidth, imageHeight);
            var base64 = canvas.toDataURL('image/png', 1);
            var imgbase = base64.substr(22);
            callback(imgbase)
            //this.imgUrl =
          }
          img.src = imgUrl;
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
            // console.log(res);
            _this.clear();
            _this.contents = '';
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
