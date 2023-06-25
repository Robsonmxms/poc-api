import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { User } from '@prisma/client';
import { CreateActivityDto } from './dtos/create-activity.dto';

@Controller('activities')
export class ActivitiesController {
    constructor(private activitiesService: ActivitiesService) {}

    @Get()
    getActivities(@Query('name') name?: string) {
        return this.activitiesService.getAll(name);
    }

    @Get('/:activityId')
    getActivitiesById(@Param('activityId') activityId: string) {
        return this.activitiesService.getActivityById(Number(activityId));
    }

    @Post()
    post(@Body() params: { name: string; description: string; users: User[] }) {
        return this.activitiesService.post(params);
    }

    @Patch('/:id')
    patch(@Param('id') activityId: string, @Body() params: CreateActivityDto) {
        return this.activitiesService.patch(+activityId, params);
    }

    @Delete('/:id')
    delete(@Param('id') activityId: string) {
        return this.activitiesService.delete(+activityId);
    }
}
