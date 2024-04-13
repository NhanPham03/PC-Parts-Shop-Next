import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    const adminUser = await prisma.user.create({
      data: {
        first_name: "Nhan",
        last_name: "Pham",
        email: "admin@pcparts.shop",
        city: "Ho Chi Minh",
        country: "Vietnam",
      },
    });

    const adminPassword = await bcrypt.hash("password123", 10);
    const adminAccount = await prisma.account.create({
      data: {
        username: "admin",
        password: adminPassword.toString(),
        user: { connect: { user_id: adminUser.user_id } },
      }
    });

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("ERROR SEEDING:", error);
  }
}

seed().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
