import StarterKit from '@tiptap/starter-kit'
import TiptapUnderline from '@tiptap/extension-underline'
import HorizontalRule from './horizontalRule'
// import { Markdown } from 'tiptap-markdown'

export const defaultExtensions = [
  StarterKit.configure({
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-700'
      }
    }
  }),
  TiptapUnderline,
  HorizontalRule
  // Markdown.configure({
  //   html: false,
  //   transformCopiedText: true,
  //   transformPastedText: true
  // })
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
]
