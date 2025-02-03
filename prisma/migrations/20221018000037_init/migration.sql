-- CreateTable
CREATE TABLE "HealthCareFacility" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HealthCareFacility_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Worker" (
    "uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Shift" (
    "uuid" TEXT NOT NULL,
    "facilityUuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "baseHourlyRate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "workerSlots" INTEGER NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ShiftAssignment" (
    "shiftUuid" TEXT NOT NULL,
    "workerUuid" TEXT NOT NULL,

    CONSTRAINT "ShiftAssignment_pkey" PRIMARY KEY ("shiftUuid","workerUuid")
);

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_facilityUuid_fkey" FOREIGN KEY ("facilityUuid") REFERENCES "HealthCareFacility"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftAssignment" ADD CONSTRAINT "ShiftAssignment_shiftUuid_fkey" FOREIGN KEY ("shiftUuid") REFERENCES "Shift"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftAssignment" ADD CONSTRAINT "ShiftAssignment_workerUuid_fkey" FOREIGN KEY ("workerUuid") REFERENCES "Worker"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
