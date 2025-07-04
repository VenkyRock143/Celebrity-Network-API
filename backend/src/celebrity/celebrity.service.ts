import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Celebrity } from './celebrity.entity';

@Injectable()
export class CelebrityService {
  constructor(
    @InjectRepository(Celebrity)
    private celebrityRepo: Repository<Celebrity>,
  ) {}

  create(data: Partial<Celebrity>) {
    const celebrity = this.celebrityRepo.create(data);
    return this.celebrityRepo.save(celebrity);
  }

  findAll() {
    return this.celebrityRepo.find();
  }

  async findOne(id: number): Promise<Celebrity> {
    const celeb = await this.celebrityRepo.findOne({ where: { id } });
    if (!celeb) throw new NotFoundException('Celebrity not found');
    return celeb;
  }

  update(id: number, data: Partial<Celebrity>) {
    return this.celebrityRepo.update(id, data);
  }

  remove(id: number) {
    return this.celebrityRepo.delete(id);
  }
}
