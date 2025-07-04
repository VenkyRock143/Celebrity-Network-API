import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Celebrity } from './celebrity.entity';
import { CelebrityService } from './celebrity.service';
import { CelebrityController } from './celebrity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Celebrity])],
  controllers: [CelebrityController],
  providers: [CelebrityService],
})
export class CelebrityModule {}
