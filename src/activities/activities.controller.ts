import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private activitesService: ActivitiesService) {}

  @Get()
  getAll(){
    return this.activitesService.getAll();
  }

  @Get()
  getAllFilteredByName(@Query("name") name:string) {
    return this.activitesService.getAllFilteredByName(name);
  }

  @Get(':activityId')
  getActivitiesByPersonId(@Param('activityId') activityId: string) {
    return this.activitesService.getOne(Number(activityId));
  }

  @Post()
  post(@Body() params: { name: string , description: string}) {
    return this.activitesService.post(params);
  }
}
