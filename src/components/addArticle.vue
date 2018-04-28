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
            <v-text-field label="文章标题" v-model="article_title" :rules="[v => !!v || '请输入文章标题']" required></v-text-field>
            <v-text-field label="文章描述" v-model="article_desc" :rules="[v => !!v || '请输入文章描述']" required></v-text-field>
            <v-select label="文章分类" v-model="article_type" :items="types" :rules="[v => !!v || '请选择分类']" required></v-select>

            <div class="quill-editor-example">
              <VueEditor ref="myTextEditor" v-model="article_content" placeholder="文章内容"></VueEditor>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md4>
      <v-card>
        <v-card-title>
          <h4>发布文章</h4></v-card-title>
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
// import axios from 'axios'
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';
// import {
//   quillEditor
// } from 'vue-quill-editor';
import {
  VueEditor
} from 'vue2-editor';
export default {
  data() {
    return {
      valid: true,
      article_title: '',
      article_content: '',
      article_desc: '',
      article_type: null,
      types: [
        '文章分类1',
        '文章分类2',
        '文章分类3',
        '文章分类4'
      ]
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.article_content);
        if (this.article_content == '') {
          console.log("空");
        }
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //   name: this.name,
        //   select: this.select,
        // })
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
<style scoped>
.quill-editor {
  height: 300px;
}
</style>
