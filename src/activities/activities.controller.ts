import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private activitesService: ActivitiesService) {}

  @Get()
  getActivities(@Query("name") name?:string) {
    if (name !== undefined && name !== null) {
      return this.activitesService.getAllFilteredByName(name);
    } else {
        return this.activitesService.getAll();
    }
  }

  @Get(':activityId')
  getActivitiesById(@Param('activityId') activityId: string) {
    return this.activitesService.getActivitiesById(Number(activityId));
  }

  @Post()
  post(@Body() params: { name: string , description: string}) {
    return this.activitesService.post(params);
  }
}