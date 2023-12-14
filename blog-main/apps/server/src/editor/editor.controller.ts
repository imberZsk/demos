import { Controller, Get, Param } from '@nestjs/common';
import { EditorService } from './editor.service';

@Controller('editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @Get(':id')
  async findEditorById(@Param('id') id: number) {
    const editor = await this.editorService.findEditorById(id);
    return editor;
  }
}
