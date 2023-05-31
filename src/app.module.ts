import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ActivitiesModule, UsersModule]
})
export class AppModule {}

