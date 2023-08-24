import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    await prisma.user.createMany({
        data: [
            { name: 'Admin', email: 'Admin@gmail.com',age:34 },
        ],
    });

}

seed()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
