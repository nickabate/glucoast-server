-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "weekday" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "sleep" INTEGER NOT NULL,
    "exercise" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DayLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "dayLogId" INTEGER NOT NULL,
    "mealNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "insulin" INTEGER NOT NULL,
    "preglucose" INTEGER NOT NULL,
    "postglucose" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userid_key" ON "User"("userid");

-- AddForeignKey
ALTER TABLE "DayLog" ADD CONSTRAINT "DayLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dayLogId_fkey" FOREIGN KEY ("dayLogId") REFERENCES "DayLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
