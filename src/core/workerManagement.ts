import { Prisma, Worker } from "@prisma/client";
import { prisma } from "../prismaClient";

export function createWorker(data: Prisma.WorkerCreateInput): Promise<Worker> {
  return prisma.worker.create({ data });
}

export function listWorkers(): Promise<Worker[]> {
  return prisma.worker.findMany();
}
