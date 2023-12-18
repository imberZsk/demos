'use client'

import { useCallback, useState } from 'react'
import { createEditor } from 'slate'
import { Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

const CustomEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          // console.log(event.key)
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case '`': {
              event.preventDefault()
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === 'code'
              })

              // 支节点
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: (n) => Editor.isBlock(editor, n) }
              )
              break
            }

            case 'b': {
              event.preventDefault()
              // 叶节点
              Editor.addMark(editor, 'bold', true)
              break
            }
          }
        }}
      />
    </Slate>
  )
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

export default CustomEditor
