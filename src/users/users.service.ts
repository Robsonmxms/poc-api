import { Injectable } from '@nestjs/common';
import { User } from './dto/users.dto';

@Injectable()
export class UsersService {
    private users: User[]

    constructor(){
        this.users = []
    }

    getAll(): User[]{
        return this.users
    }
}

