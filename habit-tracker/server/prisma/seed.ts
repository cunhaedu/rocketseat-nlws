import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd';
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000');

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297';
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000');

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00';
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000');

async function run() {
  await prisma.habit.deleteMany();
  await prisma.day.deleteMany();

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Beber 2L água',
        createdAt: firstHabitCreationDate,
        habitWeekDays: {
          create: [
            { id: randomUUID(), weekDay: 1 },
            { id: randomUUID(), weekDay: 2 },
            { id: randomUUID(), weekDay: 3 },
          ],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Exercitar',
        createdAt: secondHabitCreationDate,
        habitWeekDays: {
          create: [
            { id: randomUUID(), weekDay: 3 },
            { id: randomUUID(), weekDay: 4 },
            { id: randomUUID(), weekDay: 5 },
          ],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Dormir 8h',
        createdAt: thirdHabitCreationDate,
        habitWeekDays: {
          create: [
            { id: randomUUID(), weekDay: 1 },
            { id: randomUUID(), weekDay: 2 },
            { id: randomUUID(), weekDay: 3 },
            { id: randomUUID(), weekDay: 4 },
            { id: randomUUID(), weekDay: 5 },
          ],
        },
      },
    }),
  ]);

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        id: randomUUID(),
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habitId: firstHabitId,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        id: randomUUID(),
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habitId: firstHabitId,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        id: randomUUID(),
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [{ habitId: firstHabitId }, { habitId: secondHabitId }],
        },
      },
    }),
  ]);
}

run()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
