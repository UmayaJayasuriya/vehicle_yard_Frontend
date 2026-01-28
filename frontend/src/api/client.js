const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function mapFromApi(v) {
  if (!v) return v;
  return {
    id: v.id,
    title: v.title,
    price: v.price,
    shortDesc: v.shortDesc,
    status: v.status,
    coverImage: v.coverImage,
    images: Array.isArray(v.images) ? v.images.map(i => i.url) : (v.images || []),
    details: {
      brand: v.brand,
      model: v.modelName,
      year: v.year,
      mileageKm: v.mileageKm,
      fuel: v.fuel,
      transmission: v.transmission,
      location: v.location,
      chassisNo: v.chassisNo,
      engineNo: v.engineNo,
      registrationNo: v.registrationNo,
      color: v.color,
    },
    finance: {
      boughtPrice: v.boughtPrice,
      boughtDate: v.boughtDate ? new Date(v.boughtDate).toISOString().slice(0,10) : null,
      maintenance: v.maintenance || [],
      soldPrice: v.soldPrice ?? null,
      soldDate: v.soldDate ? new Date(v.soldDate).toISOString().slice(0,10) : null,
      invoice: v.finance?.invoice,
    }
  };
}

function mapToApi(v) {
  if (!v) return v;
  return {
    id: v.id,
    title: v.title,
    price: v.price,
    shortDesc: v.shortDesc,
    status: v.status,
    coverImage: v.coverImage,
    images: Array.isArray(v.images) ? v.images : [],
    details: {
      brand: v.details?.brand,
      model: v.details?.model,
      year: v.details?.year,
      mileageKm: v.details?.mileageKm,
      fuel: v.details?.fuel,
      transmission: v.details?.transmission,
      location: v.details?.location,
      chassisNo: v.details?.chassisNo,
      engineNo: v.details?.engineNo,
      registrationNo: v.details?.registrationNo,
      color: v.details?.color,
    },
    finance: {
      boughtPrice: v.finance?.boughtPrice,
      boughtDate: v.finance?.boughtDate,
      soldPrice: v.finance?.soldPrice,
      soldDate: v.finance?.soldDate,
      maintenance: v.finance?.maintenance,
      invoice: v.finance?.invoice,
    }
  };
}

async function http(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  const contentType = res.headers.get('content-type') || '';
  return contentType.includes('application/json') ? res.json() : res.text();
}

export const api = {
  getHealth: () => http('/api/health'),
  getVehicles: async () => {
    const list = await http('/api/vehicles');
    return Array.isArray(list) ? list.map(mapFromApi) : [];
  },
  getVehicle: async (id) => {
    const v = await http(`/api/vehicles/${id}`);
    return mapFromApi(v);
  },
  createVehicle: async (data) => {
    const v = await http('/api/vehicles', { method: 'POST', body: mapToApi(data) });
    return mapFromApi(v);
  },
  updateVehicle: async (id, data) => {
    const v = await http(`/api/vehicles/${id}`, { method: 'PUT', body: mapToApi(data) });
    return mapFromApi(v);
  },
  deleteVehicle: (id) => http(`/api/vehicles/${id}`, { method: 'DELETE' }),
  addMaintenance: (id, data) => http(`/api/vehicles/${id}/maintenance`, { method: 'POST', body: data }),
  deleteMaintenance: (id, mid) => http(`/api/vehicles/${id}/maintenance/${mid}`, { method: 'DELETE' }),
};

export default api;
