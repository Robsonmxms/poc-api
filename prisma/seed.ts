import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
    try {
        const user1Pass = 'user1Pass';
        const user1 = await prisma.user.create({
            data: {
                name: 'User 1',
                email: 'email1@server.com',
                pass: await bcrypt.hash(user1Pass, 10),
            },
        });

        const user2Pass = 'user2Pass';
        const user2 = await prisma.user.create({
            data: {
                name: 'User 2',
                email: 'email2@server.com',
                pass: await bcrypt.hash(user2Pass, 10),
            },
        });

        const activity1 = await prisma.activity.create({
            data: {
                name: 'Activity 1',
                description: 'Description of Activity 1',
                users: {
                    connect: [{ id: user1.id }, { id: user2.id }],
                },
            },
        });

        const activity2 = await prisma.activity.create({
            data: {
                name: 'Activity 2',
                description: 'Description of Activity 2',
                users: {
                    connect: [{ id: user2.id }],
                },
            },
        });

        console.log('Seed data created successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
