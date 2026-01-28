import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// List vehicles
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: { images: true, maintenance: true }
    });
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// Get vehicle by id
app.get('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: req.params.id },
      include: { images: true, maintenance: true }
    });
    if (!vehicle) return res.status(404).json({ error: 'Not found' });
    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
});

// Create vehicle
app.post('/api/vehicles', async (req, res) => {
  try {
    const {
      id,
      title,
      price,
      shortDesc,
      status,
      coverImage,
      details = {},
      finance = {},
      images = []
    } = req.body;

    const created = await prisma.vehicle.create({
      data: {
        id,
        title,
        price,
        shortDesc,
        status,
        coverImage,
        brand: details.brand,
        modelName: details.model,
        year: details.year,
        mileageKm: details.mileageKm,
        fuel: details.fuel,
        transmission: details.transmission,
        location: details.location,
        chassisNo: details.chassisNo,
        engineNo: details.engineNo,
        registrationNo: details.registrationNo,
        color: details.color,
        boughtPrice: finance.boughtPrice,
        boughtDate: finance.boughtDate ? new Date(finance.boughtDate) : undefined,
        soldPrice: finance.soldPrice,
        soldDate: finance.soldDate ? new Date(finance.soldDate) : undefined,
        images: {
          create: images.map((url) => ({ id: `img_${Math.random().toString(16).slice(2)}_${Date.now()}`, url }))
        }
      },
      include: { images: true, maintenance: true }
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
});

// Update vehicle
app.put('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const {
      title,
      price,
      shortDesc,
      status,
      coverImage,
      details = {},
      finance = {},
      images = undefined
    } = req.body;

    // Update scalar fields first
    const updated = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        title,
        price,
        shortDesc,
        status,
        coverImage,
        brand: details.brand,
        modelName: details.model,
        year: details.year,
        mileageKm: details.mileageKm,
        fuel: details.fuel,
        transmission: details.transmission,
        location: details.location,
        chassisNo: details.chassisNo,
        engineNo: details.engineNo,
        registrationNo: details.registrationNo,
        color: details.color,
        boughtPrice: finance.boughtPrice,
        boughtDate: finance.boughtDate ? new Date(finance.boughtDate) : undefined,
        soldPrice: finance.soldPrice,
        soldDate: finance.soldDate ? new Date(finance.soldDate) : undefined
      },
      include: { images: true, maintenance: true }
    });

    // If images provided, replace existing set
    if (Array.isArray(images)) {
      await prisma.vehicleImage.deleteMany({ where: { vehicleId } });
      if (images.length) {
        await prisma.vehicleImage.createMany({
          data: images.map((url) => ({
            id: `img_${Math.random().toString(16).slice(2)}_${Date.now()}`,
            url,
            vehicleId
          }))
        });
      }
    }

    const finalVehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { images: true, maintenance: true }
    });

    res.json(finalVehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
});

// Delete vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
  try {
    await prisma.vehicle.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
});

// Add maintenance
app.post('/api/vehicles/:id/maintenance', async (req, res) => {
  try {
    const { cost, note, date } = req.body;
    const created = await prisma.maintenance.create({
      data: {
        id: `m_${Math.random().toString(16).slice(2)}_${Date.now()}`,
        cost,
        note,
        date: date ? new Date(date) : new Date(),
        vehicleId: req.params.id
      }
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add maintenance' });
  }
});

// Delete maintenance
app.delete('/api/vehicles/:id/maintenance/:mid', async (req, res) => {
  try {
    await prisma.maintenance.delete({ where: { id: req.params.mid } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete maintenance' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
