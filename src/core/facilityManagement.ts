import { HealthCareFacility, Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";

export function createHealthCareFacility(
  data: Prisma.HealthCareFacilityCreateInput,
): Promise<HealthCareFacility> {
  return prisma.healthCareFacility.create({ data });
}

export function listHealthCareFacilities(): Promise<HealthCareFacility[]> {
  return prisma.healthCareFacility.findMany();
}
