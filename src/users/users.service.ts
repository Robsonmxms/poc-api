import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(): Promise<User[]> {
        return this.prismaService.user.findMany({
            include: { activities: true },
        });
    }

    async getAllFilteredByName(name: string): Promise<User[]> {
        return this.prismaService.user.findMany({
            where: { name },
            include: { activities: true }
        });
    }

    async getUserById(id: number): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { id },
            include: { activities: true }
        });
    }

    async post(param: { name: string }): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                name: param.name,
            },
        });
        return user;
    }

    async deleteAll(): Promise<void> {
        await this.prismaService.user.deleteMany();
    }
}
