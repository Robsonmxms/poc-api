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
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Public } from 'src/auth/constants';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(@Query('name') name?: string) {
        return this.usersService.getAll(name);
    }

    @Get(':userId')
    getUserById(@Param('userId') userId: string) {
        return this.usersService.getUserById(Number(userId));
    }

    @Public()
    @Post()
    post(@Body() params: { name: string; email: string; pass: string }) {
        return this.usersService.post(params);
    }

    @Patch('/:id')
    patch(@Param('id') userId: string, @Body() params: CreateUserDto) {
        return this.usersService.patch(+userId, params);
    }

    @Delete('/:id')
    delete(@Param('id') userId: string) {
        return this.usersService.delete(+userId);
    }
}
