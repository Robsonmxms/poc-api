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

    getAllFilteredByName(name: string): User[] {
        return this.users.filter(user => {return user.name === name})
    }

    getUserById(id: number): User {
        return this.users[id]
    }

    post(param: {name: string}) {
        const user = {
            id: this.users.length,
            name: param.name,
        };

        this.users.push(user);

        return user
    }
}

