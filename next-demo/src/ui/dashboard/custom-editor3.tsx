'use client'

import { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

// const initialValue = [
//   {
//     type: 'paragraph',
//     children: [{ text: 'A line of text in a paragraph.' }]
//   }
// ]

const CustomEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content') || '') || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }]
        }
      ],
    []
  )

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        )
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
        }
      }}
    >
      <Editable />
    </Slate>
  )
}

export default CustomEditor
