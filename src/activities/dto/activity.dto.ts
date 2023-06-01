import { User } from "src/users/dto/users.dto";

export class Activity {
    id: string | number ;
    name: string;
    description: string;
    users: User[];
}