'use client'

import { useLoadModal } from './use-load-modal'

function Model(): JSX.Element {
  const { containerRef, loading } = useLoadModal()

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen bg-black flex">
          <div className="spinner">
            <div className="spinner1" />
          </div>
        </div>
      ) : null}

      <div className="w-full h-full" ref={containerRef} />
    </>
  )
  // 使用容器引用并将其添加到 JSX 树中
}

export default Model
