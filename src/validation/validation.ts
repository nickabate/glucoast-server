import z from 'zod';

export const MealInputSchema = z.object({
    mealNumber: z.number().int().positive(),
    name: z.string().min(1),
    insulin: z.number().nonnegative(),
    preglucose: z.number().int(),
    postglucose: z.number().int(),
});

export const DayLogInputSchema = z.object({
    userid: z.string().min(1),
    week: z.number().int().min(1).max(52),
    weekday: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    day: z.number().int().positive(),
    sleep: z.number().int().min(0).max(24),
    exercise: z.boolean(),
    meals: z.array(MealInputSchema),
});

export type MealInput = z.infer<typeof MealInputSchema>;
export type DayLogInput = z.infer<typeof DayLogInputSchema>;