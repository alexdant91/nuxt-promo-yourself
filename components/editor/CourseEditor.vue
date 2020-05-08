<template>
  <div class="editor editor-squished course-editor">
    <course-menu :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import CourseMenu from "~/components/editor/CourseMenu";
import {
  Bold,
  Italic,
  History,
  OrderedList,
  BulletList,
  ListItem,
  Image
} from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    CourseMenu
  },
  props: {
    initialContent: {
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
      extensions: [
        new Image(),
        new Bold(),
        new Italic(),
        new History(),
        new OrderedList(),
        new BulletList(),
        new ListItem()
      ],
      onUpdate: () => {
        this.emitUpdate();
      }
    });

    this.initialContent && this.editor.setContent(this.initialContent);
  },
  beforeDestroy() {
    if (this.editor) this.editor.destroy();
  },
  methods: {
    emitUpdate() {
      const content = this.editor.getHTML();
      this.$emit("editorUpdated", content);
    }
  }
};
</script>

<style lang="scss">
.editor.editor-squished {
  max-width: 100%;
  margin: 0 auto;
}

.course-editor {
  * {
    &:focus {
      outline: none;
    }
  }

  border: 1px solid lightgray;

  .editor__content {
    padding: 0 20px 20px 20px;
  }
}
</style>