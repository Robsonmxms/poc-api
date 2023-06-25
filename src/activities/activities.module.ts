import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [UsersModule, PrismaModule],
    controllers: [ActivitiesController],
    providers: [ActivitiesService],
})
export class ActivitiesModule {}
