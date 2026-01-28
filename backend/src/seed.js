import { PrismaClient } from '@prisma/client';
import { sampleVehicles } from './sampleData.js';

const prisma = new PrismaClient();

async function main() {
  for (const v of sampleVehicles) {
    await prisma.vehicle.upsert({
      where: { id: v.id },
      update: {},
      create: {
        id: v.id,
        title: v.title,
        price: v.price,
        shortDesc: v.shortDesc,
        status: v.status,
        coverImage: v.coverImage,
        brand: v.details?.brand,
        modelName: v.details?.model,
        year: v.details?.year,
        mileageKm: v.details?.mileageKm,
        fuel: v.details?.fuel,
        transmission: v.details?.transmission,
        location: v.details?.location,
        chassisNo: v.details?.chassisNo,
        engineNo: v.details?.engineNo,
        registrationNo: v.details?.registrationNo,
        color: v.details?.color,
        boughtPrice: v.finance?.boughtPrice,
        boughtDate: v.finance?.boughtDate ? new Date(v.finance.boughtDate) : undefined,
        soldPrice: v.finance?.soldPrice ?? undefined,
        soldDate: v.finance?.soldDate ? new Date(v.finance.soldDate) : undefined,
        images: {
          create: (v.images || []).map((url) => ({ id: `img_${Math.random().toString(16).slice(2)}_${Date.now()}`, url }))
        }
      }
    });
    for (const m of v.finance?.maintenance || []) {
      await prisma.maintenance.create({
        data: {
          id: `m_${Math.random().toString(16).slice(2)}_${Date.now()}`,
          cost: m.cost,
          note: m.note,
          date: new Date(m.date),
          vehicleId: v.id
        }
      });
    }
  }
}

main()
  .then(async () => {
    console.log('Seed completed');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
