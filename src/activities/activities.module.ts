import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [UsersModule]
})
export class ActivitiesModule {}
