import { Injectable } from "@nestjs/common";
import { Activity } from "./dto/activity.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/dto/users.dto";

@Injectable()
export class ActivitiesService {
    private activities: Activity[]
    private usersService: UsersService
    
    constructor(usersService: UsersService){
        this.activities = []
        this.usersService = usersService
    }
    
    getAll(): Activity[]{
        return this.activities
    }
    
    getAllFilteredByName(name: string): Activity[] {
        return this.activities.filter(activity => {return activity.name === name})
    }

    getActivitiesById(id: number): Activity {
        return this.activities[id]
    }

    post(param: { name: string , description: string, users: User[]}) {
        const activity = {
            id: this.activities.length,
            name: param.name,
            description: param.description,
            users: param.users
        };
        
        for (let i = 0; i < activity.users.length; i++) {
            const currentUser = activity.users[i];
            const user = this.findUserByName(this.usersService.getAll(), currentUser.name);
    
            if (user) {
                activity.users[i] = this.usersService.getUserById(Number(user.id));
            } else {
                activity.users[i] = this.usersService.post({ name: currentUser.name });
            }
        }
    
        this.activities.push(activity);
    
        return activity;
    }

    private findUserByName(users: User[], name: string): User | undefined {
        return users.find(user => user.name === name);
    }  
}