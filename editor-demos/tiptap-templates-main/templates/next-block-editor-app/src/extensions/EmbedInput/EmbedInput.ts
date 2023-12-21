import { mergeAttributes, Node, getText } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { embeds as services, EmbedService } from '../../../../lib/constants'
import { EmbedInputView } from './components/EmbedInputView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embedInput: {
      setEmbedInput: (attributes: { service?: EmbedService }) => ReturnType
    }
  }
}

export const EmbedInput = Node.create({
  name: 'embedInput',

  group: 'block',

  content: 'text*',

  marks: '',

  draggable: true,

  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: `node-${this.name}`,
      },
    }
  },

  addAttributes() {
    return {
      service: {
        parseHTML: element => element.getAttribute('data-service'),
        renderHTML: attributes => ({
          'data-service': attributes.service,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div.node-${this.name}`,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const {
          state: {
            selection: { $from, $anchor },
          },
        } = editor

        if ($from.parent.type !== this.type) {
          return false
        }

        const url = getText($anchor.parent)

        editor.chain().focus().setNode('paragraph').run()

        return true
      },
    }
  },

  addCommands() {
    return {
      setEmbedInput:
        ({ service = undefined }) =>
        ({ commands }) =>
          commands.setNode(this.name, { service }),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedInputView)
  },
})

export default EmbedInput
