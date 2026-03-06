import { prisma } from "../shared/lib/prisma";

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error("Usage: npm run grant-admin -- <email>");
  process.exit(1);
}

(async () => {
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  console.log(`Admin access granted for ${email}`);
})()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
