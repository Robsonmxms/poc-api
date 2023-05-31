import { Injectable } from "@nestjs/common";
import { Activity } from "./dto/activity.dto";

@Injectable()
export class ActivitiesService {
    private activities: Activity[]
    
    constructor(){
        this.activities = []
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

    post(param: { name: string , description: string}) {
        const activity = {
            id: this.activities.length,
            name: param.name,
            description: param.description
        };

        this.activities.push(activity);

        return activity
    }
}