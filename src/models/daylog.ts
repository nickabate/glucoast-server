import { prisma } from '../config/prisma.js';

export interface MealInput {
    mealNumber: number;
    name: string;
    insulin: number;
    preglucose: number;
    postglucose: number;
}

export interface DayLogInput {
    userid: string;
    week: number;
    weekday: string;
    day: number;
    sleep: number;
    exercise: boolean;
    meals: MealInput[];
}

export const createDayLog = async (data: DayLogInput) => {
    const user = await prisma.user.upsert({
        where: { userid: data.userid },
        update: {},
        create: { userid: data.userid },
    });

    const dayLog = await prisma.dayLog.create({
        data: {
            userId: user.id,
            week: data.week,
            weekday: data.weekday,
            day: data.day,
            sleep: data.sleep,
            exercise: data.exercise ?? false,
            meals: {
                create: data.meals.map((m) => ({
                    mealNumber: m.mealNumber,
                    name: m.name,
                    insulin: m.insulin,
                    preglucose: m.preglucose,
                    postglucose: m.postglucose,
                })),
            },
        },
        include: { meals: true },
    });

    return dayLog;
};

export const getAllDayLogs = async () => {
    return prisma.dayLog.findMany({ include: { user: true, meals: true } });
};

export const getDayLogById = async (id: number) => {
    return prisma.dayLog.findUnique({
        where: { id },
        include: { user: true, meals: true },
    });
};

export const updateDayLog = async (id: number, data: DayLogInput) => {
    const existing = await prisma.dayLog.findUnique({ where: { id } });
    if (!existing) throw new Error("DayLog not found");

    await prisma.meal.deleteMany({ where: { dayLogId: id } }); // replace all meals

    return prisma.dayLog.update({
        where: { id },
        data: {
            week: data.week,
            weekday: data.weekday,
            day: data.day,
            sleep: data.sleep,
            exercise: data.exercise ?? false,
            meals: {
                create: data.meals.map((m) => ({
                    mealNumber: m.mealNumber,
                    name: m.name,
                    insulin: m.insulin,
                    preglucose: m.preglucose,
                    postglucose: m.postglucose,
                })),
            },
        },
        include: { meals: true },
    });
};

export const deleteDayLog = async (id: number) => {
    await prisma.meal.deleteMany({ where: { dayLogId: id } });
    return prisma.dayLog.delete({ where: { id } });
};