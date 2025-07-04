import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';
import { Celebrity } from '../celebrity/celebrity.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepo: Repository<Follow>,
    @InjectRepository(Celebrity) private celebRepo: Repository<Celebrity>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async followCelebrity(fanId: number, celebId: number) {
    const fan = await this.userRepo.findOne({ where: { id: fanId } });
    const celeb = await this.celebRepo.findOne({ where: { id: celebId } });

    if (!fan || !celeb) throw new NotFoundException('User or celebrity not found');

    const follow = this.followRepo.create({ fan, celebrity: celeb });
    return this.followRepo.save(follow);
  }

  async getFanDashboard(fanId: number) {
    return this.followRepo.find({
      where: { fan: { id: fanId } },
      relations: ['celebrity'],
    });
  }
}
