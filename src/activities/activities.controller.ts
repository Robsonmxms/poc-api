import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { User } from '@prisma/client';

@Controller('activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Get()
  getActivities(@Query("name") name?:string) {
    if (name !== undefined && name !== null) {
      return this.activitiesService.getAllFilteredByName(name);
    } else {
        return this.activitiesService.getAll();
    }
  }

  @Get(':activityId')
  getActivitiesById(@Param('activityId') activityId: string) {
    return this.activitiesService.getActivityById(Number(activityId));
  }

  @Post()
  post(@Body() params: { name: string , description: string, users: User[]}) {
    return this.activitiesService.post(params);
  }

  @Delete()
  deleteAllActivities(): Promise<void> {
    return this.activitiesService.deleteAll();
  }
}