import { describe, it, expect } from 'vitest';
import { DayLogInputSchema } from '../src/validation/validation';

describe('DayLogInputSchema', () => {
    it('validates correct input', () => {
        const valid = {
            userid: 'testuser',
            week: 1,
            weekday: 'Monday',
            day: 1,
            sleep: 8,
            exercise: true,
            meals: [
                {
                    mealNumber: 1,
                    name: 'Breakfast',
                    insulin: 5,
                    preglucose: 100,
                    postglucose: 120,
                },
            ],
        };
        expect(() => DayLogInputSchema.parse(valid)).not.toThrow();
    });

    it('throws on missing required fields', () => {
        const invalid = {
            week: 1,
            weekday: 'Monday',
            day: 1,
            sleep: 8,
            exercise: true,
            meals: [],
        };
        expect(() => DayLogInputSchema.parse(invalid)).toThrow();
    });

    it('throws on invalid meal data', () => {
        const invalid = {
            userid: 'testuser',
            week: 1,
            weekday: 'Monday',
            day: 1,
            sleep: 8,
            exercise: true,
            meals: [
                {
                    mealNumber: 1,
                    name: 'Breakfast',
                    insulin: 'not-a-number',
                    preglucose: 100,
                    postglucose: 120,
                },
            ],
        };
        expect(() => DayLogInputSchema.parse(invalid)).toThrow();
    });
});
