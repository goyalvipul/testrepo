import express from "express";
import "express-async-errors";
import {
  createHealthCareFacility,
  listHealthCareFacilities,
} from "../../core/facilityManagement";
import {
  applyToShift,
  createShift,
  listAllShifts,
  listHealthCareFacilityShifts,
  listWorkerShifts,
} from "../../core/shiftManagement";
import { createWorker, listWorkers } from "../../core/workerManagement";

export const v1 = express();

v1.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// Facilities
const facilitiesBase = "/facilities";
v1.get(facilitiesBase, async (req, res) => {
  const facilities = await listHealthCareFacilities();
  res.json({ facilities });
});

v1.post(facilitiesBase, async (req, res) => {
  const facility = await createHealthCareFacility(req.body);
  res.json(facility);
});

v1.get(`${facilitiesBase}/:uuid/shifts`, async (req, res) => {
  const shifts = await listHealthCareFacilityShifts(req.params.uuid);
  res.json({ shifts });
});

v1.post(`${facilitiesBase}/:uuid/shifts`, async (req, res) => {
  const shift = await createShift(
    req.params.uuid,
    req.body,
  );
  res.json(shift);
});

// Workers
const workersBase = "/workers";
v1.get(workersBase, async (req, res) => {
  const workers = await listWorkers();
  res.json({ workers });
});

v1.post(workersBase, async (req, res) => {
  const worker = await createWorker(req.body);
  res.json(worker);
});

v1.get(`${workersBase}/:uuid/shifts`, async (req, res) => {
  const shifts = await listWorkerShifts(req.params.uuid);
  res.json({ shifts });
});

v1.post(`${workersBase}/:uuid/shifts`, async (req, res) => {
  const shift = await applyToShift(
    req.params.uuid,
    req.body.shiftUuid,
  );
  res.json(shift);
});

// Shifts
const shiftsBase = "/shifts";
v1.get(shiftsBase, async (req, res) => {
  const shifts = await listAllShifts();
  res.json({ shifts });
});
