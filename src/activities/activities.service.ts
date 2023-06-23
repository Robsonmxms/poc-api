import { Injectable, NotFoundException, Query } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Activity, User } from "@prisma/client";
import { CreateActivityDto } from "./dtos/create-activity.dto";

@Injectable()
export class ActivitiesService {
    
    constructor(private readonly prismaService: PrismaService){}
    
    async getAll(name?: string): Promise<Activity[]> {
        return this.prismaService.activity.findMany({
            where: name ? { name } : undefined,
            include: { users: true }
        });
    }

    async getActivityById(id: number): Promise<Activity | null> {
        const activity = await this.prismaService.activity.findUnique({
            where: { id },
            include: { users: true },
        });

        if(!activity) {
            throw new NotFoundException("Activity not found")
        }

        return activity
    }

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
    
    async patch(id: number, param: CreateActivityDto): Promise<Activity> {
        try {
            return await this.prismaService.activity.update({
                where: { id },
                data: param
            })
        } catch(error) {
            console.log(error);
            throw new NotFoundException("Activity not found");
        }
    }
    
    async delete(id: number): Promise<Activity> {
        try {
            return await this.prismaService.activity.delete({
                where: { id }
            });
        } catch(error){
            console.log(error);
            throw new NotFoundException("Activity not found");
        }
    }
}