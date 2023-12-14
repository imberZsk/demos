'use client'

import { Editor } from '@bytemd/react'
import 'bytemd/dist/index.css'
import zhHans from 'bytemd/locales/zh_Hans.json'
import './index.css'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import 'highlight.js/styles/monokai-sublime.css'
import type { BytemdPlugin } from 'bytemd'
import frontmatter from '@bytemd/plugin-frontmatter'
import Image from 'next/image'
import { useUpload } from './hooks'

const plugins: BytemdPlugin[] = [gfm(), highlight(), frontmatter()]

const Page = () => {
  const { submit, value, setValue } = useUpload()

  return (
    <div className="h-[100vh]">
      <div className="flex justify-between items-center px-[36px]">
        <input
          className="h-[64px] text-[#1d2129] text-[24px] font-bold outline-none"
          placeholder="输入文章标题..."
          type="text"
        />
        <div className="flex">
          <button
            className="h-[32px] bg-[#ff4132] rounded-[2px] px-[16px] text-[#ffffff] mr-[20px]"
            onClick={submit}
            type="button"
          >
            发布
          </button>
          <div className="w-[32px] h-[32px]">
            <Image
              alt=""
              className="rounded-[50%] object-cover"
              height={32}
              src="https://p3-passport.byteacctimg.com/img/user-avatar/7827dfb31e84e8f3d5bbcf1a2688b50d~80x80.awebp"
              width={32}
            />
          </div>
        </div>
      </div>
      <Editor
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        locale={zhHans}
        onChange={v => {
          setValue(v)
        }}
        plugins={plugins}
        value={value}
      />
    </div>
  )
}

export default Page
