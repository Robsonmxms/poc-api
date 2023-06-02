import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    try {
        const user1 = await prisma.user.create({
            data: {
                name: 'User 1',
            },
        });

        const user2 = await prisma.user.create({
            data: {
                name: 'User 2',
            },
        });

        const activity1 = await prisma.activity.create({
            data: {
                name: 'Activity 1',
                description: 'Description of Activity 1',
                users: {
                    connect: [
                        { id: user1.id },
                        { id: user2.id },
                    ],
                },
            },
        });

        const activity2 = await prisma.activity.create({
            data: {
                name: 'Activity 2',
                description: 'Description of Activity 2',
                users: {
                    connect: [
                        { id: user2.id },
                    ],
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
