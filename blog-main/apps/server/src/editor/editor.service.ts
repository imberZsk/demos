import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editor } from './entities/editor.entity';

@Injectable()
export class EditorService {
  constructor(
    @InjectRepository(Editor)
    private editorRepository: Repository<Editor>,
  ) {}

  async findEditorById(id: number) {
    const res = await this.editorRepository.findOne({ where: { id } });
    return res;
  }
}
