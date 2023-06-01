import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {} 

    @Get()
    getUsers(@Query("name") name?:string){
        if (name !== undefined && name !== null) {
            return this.usersService.getAllFilteredByName(name);
        } else {
            return this.usersService.getAll();
        }
    }

    @Get(':userId')
    getUserById(@Param('userId') userId: string) {
        return this.usersService.getUserById(Number(userId));
    }

    @Post()
    post(@Body() params: {name: string}) {
        return this.usersService.post(params);
    }

    @Delete()
    deleteAllActivities(): Promise<void> {
        return this.usersService.deleteAll();
    }
}
