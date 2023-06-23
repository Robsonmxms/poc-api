import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(name?: string): Promise<User[]> {
        return this.prismaService.user.findMany({
            where: name ? { name } : undefined,
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

    async patch(id: number, param: CreateUserDto): Promise<User> {
        return this.prismaService.user.update({
            where: { id },
            data: param
        })
    }

    async delete(id: number): Promise<User> {
        try {
            return await this.prismaService.user.delete({
                where: { id }
            });
        } catch(error){
            console.log(error)
            throw new NotFoundException("User not found")
        }
    }
}
