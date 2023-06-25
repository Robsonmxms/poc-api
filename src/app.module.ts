import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ActivitiesModule, UsersModule, AuthModule],
})
export class AppModule {}
