import prisma from "./lib/prisma.js";

async function main() {
  await prisma.file.deleteMany();

  console.log('All files deleted');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });