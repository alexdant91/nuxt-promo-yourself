<template>
  <div class="editor editor-squished">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import {
  Heading,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  CodeBlockHighlight,
  Image
} from "tiptap-extensions";

import Title from "~/components/editor/components/Title";
import Subtitle from "~/components/editor/components/Subtitle";
import Doc from "~/components/editor/components/Doc";

import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

export default {
  components: {
    EditorContent
  },
  props: {
    content: {
      type: String,
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
      editable: false,
      extensions: [
        new Doc(),
        new Title(),
        new Subtitle(),
        new Heading({ levels: [1, 2, 3] }),
        new Image(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
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

    this.content && this.setInitialContent(this.content);
  },
  beforeDestroy() {
    if (this.editor) this.editor.destroy();
  },
  methods: {
    setInitialContent(content) {
      this.editor.setContent(content);
    }
  }
};
</script>

<style scoped lang="scss">
.button-save {
  float: right;
  background-color: #23d160;
  &:hover {
    background-color: #2bc76c;
  }
  &:disabled {
    cursor: not-allowed;
  }
}
.editor__content {
  padding: 20px;
  background: white;
}
</style>