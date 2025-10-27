import { describe, it, expect, vi } from 'vitest';
import * as daylogModel from '../src/models/daylog';

// Mock prisma
vi.mock('../src/config/prisma', () => ({
    prisma: {
        user: {
            upsert: vi.fn().mockResolvedValue({ id: 1, userid: 'testuser' }),
        },
        dayLog: {
            create: vi.fn().mockResolvedValue({ id: 1 }),
            findMany: vi.fn().mockResolvedValue([{ id: 1, user: { userid: 'testuser' }, meals: [] }]),
            findUnique: vi.fn().mockResolvedValue({ id: 1, user: { userid: 'testuser' }, meals: [] }),
            update: vi.fn().mockResolvedValue({ id: 1 }),
            delete: vi.fn().mockResolvedValue({ id: 1 }),
        },
        meal: {
            deleteMany: vi.fn().mockResolvedValue({}),
        },
    },
}));

describe('daylog model', () => {
    it('creates a day log', async () => {
        const input = {
            userid: 'testuser',
            week: 1,
            weekday: 'Monday',
            day: 1,
            sleep: 8,
            exercise: true,
            meals: [],
        };
        const result = await daylogModel.createDayLog(input);
        expect(result).toBeDefined();
        expect(result.id).toBe(1);
    });

    it('gets all day logs', async () => {
        const result = await daylogModel.getAllDayLogs();
        expect(Array.isArray(result)).toBe(true);
        expect(result[0].user.userid).toBe('testuser');
    });

    it('gets day log by id', async () => {
        const result = await daylogModel.getDayLogById(1);
        expect(result).toBeDefined();
        expect(result?.id).toBe(1);
    });

    it('updates a day log', async () => {
        const input = {
            userid: 'testuser',
            week: 1,
            weekday: 'Monday',
            day: 1,
            sleep: 8,
            exercise: true,
            meals: [],
        };
        const result = await daylogModel.updateDayLog(1, input);
        expect(result).toBeDefined();
        expect(result.id).toBe(1);
    });

    it('deletes a day log', async () => {
        const result = await daylogModel.deleteDayLog(1);
        expect(result).toBeDefined();
        expect(result.id).toBe(1);
    });
});
