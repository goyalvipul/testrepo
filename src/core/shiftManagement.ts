import {
  HealthCareFacility,
  Prisma,
  Shift,
  ShiftAssignment,
  Worker,
} from "@prisma/client";
import { prisma } from "../prismaClient";

type Timestamps = "createdAt" | "updatedAt";

export function listAllShifts(): Promise<Shift[]> {
  return prisma.shift.findMany();
}

export function listHealthCareFacilityShifts(
  facilityUuid: HealthCareFacility["uuid"],
): Promise<Shift[]> {
  return prisma.shift.findMany({ where: { facilityUuid } });
}

export function listWorkerShifts(
  workerUuid: Worker["uuid"],
): Promise<ShiftAssignment[]> {
  return prisma.shiftAssignment.findMany({
    where: { workerUuid },
    include: { shift: true },
  });
}

export function createShift(
  facilityUuid: HealthCareFacility["uuid"],
  data: Omit<Prisma.ShiftCreateInput, Timestamps>,
): Promise<Shift> {
  const createdAt = new Date();
  const updatedAt = createdAt;
  return prisma.shift.create({
    data: {
      ...data,
      facility: { connect: { uuid: facilityUuid } },
      createdAt,
      updatedAt,
    },
  });
}

export function applyToShift(
  workerUuid: Worker["uuid"],
  shiftUuid: Shift["uuid"],
): Promise<ShiftAssignment> {
  return prisma.shiftAssignment.create({
    data: {
      shift: { connect: { uuid: shiftUuid } },
      worker: { connect: { uuid: workerUuid } },
    },
  });
}
