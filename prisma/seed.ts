import { prisma } from '~/server/db';
import { faker } from '@faker-js/faker';
import { type LeaveStatus, type Prisma } from '@prisma/client';
import { slugify } from '~/features/shared/helpers/slugify';

async function main() {
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@babelcoder.com' },
    update: {},
    create: {
      email: 'admin@babelcoder.com',
      name: 'Admin',
      password: 'password',
      role: 'ADMIN',
      image: faker.internet.avatar(),
    },
  });

  // Create Users
  const numOfUsers = 10;
  const userIds: number[] = [admin.id];

  for (let i = 0; i < numOfUsers; i++) {
    const createUserInput: Prisma.UserCreateInput = {
      name: faker.internet.displayName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      role: faker.helpers.arrayElement(['ADMIN', 'MANAGER', 'MEMBER']),
    };
    const user = await prisma.user.upsert({
      where: { email: createUserInput.email },
      update: {},
      create: createUserInput,
    });

    userIds.push(user.id);
  }

  // Create Leaves
  const numOfLeaves = 100;

  for (let i = 0; i < numOfLeaves; i++) {
    const status: LeaveStatus = faker.helpers.arrayElement([
      'PENDING',
      'APPROVED',
      'REJECTED',
    ]);
    const userId = faker.helpers.arrayElement(userIds);
    const leaveDate = faker.date.future().toISOString();
    const createLeaveInput: Prisma.LeaveCreateInput = {
      leaveDate,
      reason: faker.lorem.paragraph(),
      status,
      user: { connect: { id: userId } },
      rejectionReason:
        status === 'REJECTED' ? faker.lorem.paragraph() : undefined,
    };

    await prisma.leave.upsert({
      where: {
        userId_leaveDate: {
          userId,
          leaveDate,
        },
      },
      update: {},
      create: createLeaveInput,
    });
  }

  // Create Announcements
  const numOfAnnouncements = 100;

  for (let i = 0; i < numOfAnnouncements; i++) {
    const title = faker.lorem.sentence();
    const createAnnouncementInput: Prisma.AnnouncementCreateInput = {
      title,
      slug: slugify(title),
      excerpt: faker.lorem.paragraph(),
      content: faker.lorem.paragraphs({ min: 3, max: 10 }),
      user: { connect: { id: faker.helpers.arrayElement(userIds) } },
    };

    await prisma.announcement.upsert({
      where: {
        slug: createAnnouncementInput.slug,
      },
      update: {},
      create: createAnnouncementInput,
    });
  }

  // Create Articles
  const numOfArticles = 100;

  for (let i = 0; i < numOfArticles; i++) {
    const title = faker.lorem.sentence();
    const createArticleInput: Prisma.ArticleCreateInput = {
      title,
      slug: slugify(title),
      excerpt: faker.lorem.paragraph(),
      content: faker.lorem.paragraphs({ min: 3, max: 10 }),
      image: faker.image.url(),
      user: { connect: { id: faker.helpers.arrayElement(userIds) } },
    };

    await prisma.article.upsert({
      where: {
        slug: createArticleInput.slug,
      },
      update: {},
      create: createArticleInput,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
