import { Controller, Post, Param, UseGuards, Get, Req } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('fan')
@UseGuards(AuthGuard('jwt'))
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post('follow/:id')
  follow(@Param('id') celebId: string, @Req() req) {
    const fanId = req.user.userId;
    return this.followService.followCelebrity(fanId, +celebId);
  }

  @Get('dashboard')
  dashboard(@Req() req) {
    const fanId = req.user.userId;
    return this.followService.getFanDashboard(fanId);
  }
}
