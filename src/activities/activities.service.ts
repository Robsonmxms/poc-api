import { Injectable, Query } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Activity, User } from "@prisma/client";

@Injectable()
export class ActivitiesService {
    
    constructor(private readonly prismaService: PrismaService){}
    
    async getAll(): Promise<Activity[]> {
        return this.prismaService.activity.findMany({
            include: { users: true }
        });
    }
    
    async getAllFilteredByName(name: string): Promise<Activity[]> {
        return this.prismaService.activity.findMany({
            where: { name },
            include: { users: true }
        });
    }

    async getActivityById(id: number): Promise<Activity | null> {
        return this.prismaService.activity.findUnique({
            where: { id },
            include: { users: true },
        });
    }

    // async post(param: { name: string; description: string; users: User[] }): Promise<Activity> {
    //     const activity = await this.prismaService.activity.create({
    //         data: {
    //             name: param.name,
    //             description: param.description,
    //             users: {
    //                 create: param.users,
    //             },
    //         },
    //         include: {
    //             users: true,
    //         },
    //     });
    //     return activity;
    // }

    async post(param: {
        name: string;
        description: string;
        users: User[];
    }): Promise<Activity> {
        const { name, description, users } = param;
    
        const upsertUser = users.map(async (user) => {
            return await this.prismaService.user.upsert({
                where: {
                    name: user.name,
                },
                create: {
                    name: user.name,
                },
                update: {},
                select: {
                    id: true,
                    name: true,
                },
            });
        });
    
        const connectedUsers = await Promise.all(upsertUser);
    
        const activity = await this.prismaService.activity.create({
            data: {
                name,
                description,
                users: {
                    connect: connectedUsers.map((user) => ({ id: user.id })),
                },
            },
            include: {
                users: true,
            },
        });
    
        return activity;
    }    
    
    async deleteAll(): Promise<void> {
        await this.prismaService.activity.deleteMany();
    }
}