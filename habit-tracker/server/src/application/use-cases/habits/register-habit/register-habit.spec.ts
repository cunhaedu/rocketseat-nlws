import { InMemoryHabitRepository } from '@test/repositories/in-memory-habit-repository';
import { RegisterHabit } from './register-habit';

describe('Register Habit', () => {
  it('should be able to register a new Habit', async () => {
    const habitRepository = new InMemoryHabitRepository();
    const registerHabit = new RegisterHabit(habitRepository);

    await registerHabit.execute({
      title: 'Workout',
      weekDays: [1, 2],
    });

    expect(habitRepository.habits).toHaveLength(1);
    expect(habitRepository.habits[0].title).toBe('Workout');
  });
});
