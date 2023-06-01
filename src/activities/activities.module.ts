import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, PrismaService],
  imports: [UsersModule]
})
export class ActivitiesModule {}
