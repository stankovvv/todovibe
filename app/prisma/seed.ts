import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({
  url: 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123',
      isAdmin: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      username: 'user',
      password: 'password',
      isAdmin: false,
    },
  });

  console.log('Seeded users:', admin.username, user.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
