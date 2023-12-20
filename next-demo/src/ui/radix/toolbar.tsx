'use client'
import React from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon
} from '@radix-ui/react-icons'
import './styles.css'

const ToolbarDemo = () => (
  <Toolbar.Root
    className="flex p-[10px] w-full rounded-[6px] bg-white"
    aria-label="Formatting options"
  >
    <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem
        className="text-pink-200"
        value="bold"
        aria-label="Bold"
      >
        <FontBoldIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="ToolbarSeparator" />
    <Toolbar.ToggleGroup
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value="left"
        aria-label="Left aligned"
      >
        <TextAlignLeftIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value="center"
        aria-label="Center aligned"
      >
        <TextAlignCenterIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value="right"
        aria-label="Right aligned"
      >
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="ToolbarSeparator" />
    <Toolbar.Link
      className="ToolbarLink"
      href="#"
      target="_blank"
      style={{ marginRight: 10 }}
    >
      Edited 2 hours ago
    </Toolbar.Link>
    <Toolbar.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
      Share
    </Toolbar.Button>
  </Toolbar.Root>
)

export default ToolbarDemo
