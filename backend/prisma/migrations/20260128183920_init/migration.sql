-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "shortDesc" TEXT,
    "status" TEXT NOT NULL DEFAULT 'available',
    "coverImage" TEXT,
    "brand" TEXT,
    "modelName" TEXT,
    "year" INTEGER,
    "mileageKm" INTEGER,
    "fuel" TEXT,
    "transmission" TEXT,
    "location" TEXT,
    "chassisNo" TEXT,
    "engineNo" TEXT,
    "registrationNo" TEXT,
    "color" TEXT,
    "boughtPrice" INTEGER,
    "boughtDate" DATETIME,
    "soldPrice" INTEGER,
    "soldDate" DATETIME
);

-- CreateTable
CREATE TABLE "VehicleImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "VehicleImage_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cost" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Maintenance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
