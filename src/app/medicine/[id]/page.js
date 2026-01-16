import dbConnect from '@/lib/db';
import Medicine from '@/models/Medicine';
import MedicineDetails from '@/components/MedicineDetails'; // Client component wrapper

export default async function MedicinePage({ params }) {
  const { id } = await params;
  await dbConnect();
  
  let medicine = null;
  try {
      medicine = await Medicine.findById(id).lean();
      if(medicine) medicine._id = medicine._id.toString();
  } catch (e) {
      console.error(e);
  }

  if (!medicine) return <div className="text-center py-20 text-gray-500">Medicine not found</div>;

  return <MedicineDetails medicine={medicine} />;
}
