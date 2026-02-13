const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Створюємо курс
  const course = await prisma.course.create({
    data: {
      name: 'English starter pack',
      slug: 'english-starter-pack',
      description: 'A basic introductory English course for beginners',
    },
  });
  console.log('🌱 Created course', course.id);

  const lessons = [];

  for (let i = 1; i <= 10; i++) {
    // Створюємо урок з теорією у форматі JSON
    const lesson = await prisma.lesson.create({
      data: {
        name: `Lesson ${i}`,
        slug: `lesson-${i}`,
        // Ось тут ми передаємо об'єкт, який Tiptap зрозуміє як початковий контент
        theory: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: `Welcome to Lesson ${i}` }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `This is the starting theory for lesson ${i}. Edit it in admin panel.`,
                },
              ],
            },
          ],
        },
        englishLevel: 'A1',
        courseId: course.id,
        order: i,
      },
    });
    lessons.push(lesson);
    console.log(`🌱 Created lesson ${i}: ${lesson.id}`);
  }

  // Створюємо таски та відповіді
  for (const lesson of lessons) {
    for (let i = 1; i <= 5; i++) {
      // Зменшив до 5 для швидкості сіда
      const task = await prisma.task.create({
        data: {
          question: `Task ${i} for ${lesson.name}: What is the correct translation?`,
          lessonId: lesson.id,
          order: i,
        },
      });

      await prisma.answer.createMany({
        data: [
          {
            text: `Correct answer`,
            isCorrect: true,
            taskId: task.id,
          },
          {
            text: `Wrong option A`,
            isCorrect: false,
            taskId: task.id,
          },
          {
            text: `Wrong option B`,
            isCorrect: false,
            taskId: task.id,
          },
        ],
      });
      console.log(`   ✅ Created Task ${i} for ${lesson.name}`);
    }
  }

  console.log('🌱 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
