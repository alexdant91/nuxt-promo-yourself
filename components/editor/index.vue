<template>
  <div class="editor editor-squished">
    <basic-menu :editor="editor">
      <template #saveButton>
        <button @click="emitUpdate" :disabled="isSaving" class="button is-success button-save">
          <i class="fal fa-save"></i>
        </button>
      </template>
    </basic-menu>
    <bubble-menu :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import BubbleMenu from "~/components/editor/BubbleMenu";
import BasicMenu from "~/components/editor/BasicMenu";
import {
  Heading,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  CodeBlockHighlight,
  Placeholder,
  Image
} from "tiptap-extensions";

import Title from "~/components/editor/components/Title";
import Subtitle from "~/components/editor/components/Subtitle";
import Doc from "~/components/editor/components/Doc";

import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

import 'highlight.js/styles/night-owl.css';

export default {
  components: {
    EditorContent,
    BubbleMenu,
    BasicMenu
  },
  props: {
    blog: {
      type: Object,
      required: false
    },
    isSaving: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Doc(),
        new Title(),
        new Subtitle(),
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: node => {
            if (node.type.name === "title") {
              return "Inspirational Title";
            }
            if (node.type.name === "subtitle") {
              return "Some catchy subtitle";
            }
            return "Write something";
          }
        }),
        new Heading({ levels: [1, 2, 3] }),
        new Image(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new Blockquote(),
        new HorizontalRule(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new TodoItem(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css
          }
        })
      ]
    });

    this.$emit("editorMounted", this.setInitialContent);
  },
  beforeDestroy() {
    if (this.editor) this.editor.destroy();
  },
  methods: {
    emitUpdate() {
      const content = this.getContent();
      this.$emit("editorUpdated", content);
    },
    getContent() {
      const html = this.editor.getHTML();
      const title = this.getNodeValueByName("title");
      const subtitle = this.getNodeValueByName("subtitle");

      const htmlNotParsed = document.getElementsByClassName('editor__content')[0].getElementsByTagName('div')[0].innerHTML;
      // console.log(htmlNotParsed)
      // return { content: html, title, subtitle };
      return { content: htmlNotParsed, title, subtitle };
    },
    getNodeValueByName(name) {
      const docContent = this.editor.state.doc.content;
      const nodes = docContent.content;
      const node = nodes.find(n => n.type.name === name);
      if (node) return node.textContent;
      return "";
    },
    setInitialContent(content) {
      // var el = document.createElement( 'html' );
      // el.innerHTML = content;

      // Array.from(el.querySelectorAll('pre code')).forEach(pre => {
      //   const code = pre.innerHTML;
      //   const h = hljs.highlightAuto(code, ["css", "javascript"]);
      //   pre.innerHTML = h.value;
      // })
      
      // const parsedContent = el.innerHTML;
      // console.log(parsedContent);

      // this.editor.setContent(parsedContent);
      if(process.client) this.editor.setContent(content);

      // console.log("SET_INITIAL_CONTENT")
      // setTimeout(() => {
      //   console.log("SET_TIMEOUT")
      //   hljs.registerLanguage('javascript', javascript);
      //   hljs.registerLanguage('css', css);

      //   const h = hljs.highlightAuto(content, ["css", "javascript"]);
      //   console.log(h);
        
      // })
    }
  }
};
</script>

<style scoped lang="scss">
.button-save {
  float: right;
  font-weight: bold;
  font-size: 19px;
  display: inline-flex;
  // background: #3db46e;
  background: transparent;
  border: 0;
  margin-right: 0.2rem;
  margin-top: -7px;
  border-radius: 3px;
  cursor: pointer;
  color: #ffffff;
  &:disabled {
    cursor: not-allowed;
  }
}
.editor__content {
  padding: 20px;
  background: white;
}
</style>