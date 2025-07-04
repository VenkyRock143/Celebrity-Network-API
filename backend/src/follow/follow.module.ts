import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Celebrity } from '../celebrity/celebrity.entity';
import { User } from '../auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, Celebrity, User])],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
