import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(name: string): Promise<User[]> {
        const searchCondition: Prisma.UserWhereInput = {
            OR: [{ name: { contains: name } }],
        };

        const users = await this.prismaService.user.findMany({
            where: searchCondition,
            include: { activities: true },
        });

        users.forEach((user) => delete user.pass);

        return users;
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            include: { activities: true },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async post(param: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(param.pass, 10);

        try {
            const user = await this.prismaService.user.create({
                data: {
                    name: param.name,
                    email: param.email,
                    pass: hashedPassword,
                },
            });
            delete user.pass;
            return user;
        } catch (error) {
            console.log(error);
            throw new ConflictException('Email already associated with a user');
        }
    }

    async patch(id: number, param: CreateUserDto): Promise<User> {
        if (param.pass) {
            param.pass = await bcrypt.hash(param.pass, 10);
        }
        try {
            return await this.prismaService.user.update({
                where: { id },
                data: param,
            });
        } catch (error) {
            console.log(error);
            throw new NotFoundException('User not found');
        }
    }

    async delete(id: number): Promise<User> {
        try {
            return await this.prismaService.user.delete({
                where: { id },
            });
        } catch (error) {
            console.log(error);
            throw new NotFoundException('User not found');
        }
    }
}
