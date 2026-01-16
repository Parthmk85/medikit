'use client';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MedicineCard({ medicine }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <div className="h-48 w-full bg-gray-50 relative flex items-center justify-center">
        {medicine.imageUrl ? (
             <img src={medicine.imageUrl} alt={medicine.name} className="object-contain h-full w-full p-4" />
        ) : (
            <div className="text-gray-300 font-bold text-4xl">Rx</div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wide">
              {medicine.category}
            </span>
             <span className="text-xs text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
              {medicine.problemType}
            </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">{medicine.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{medicine.description}</p>
        
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-gray-900">₹{medicine.price}</span>
          <div className="flex gap-2">
              <Link href={`/medicine/${medicine._id}`} className="px-3 py-2 border border-green-200 text-green-600 font-medium hover:bg-green-50 rounded-lg transition text-sm">
                 View
             </Link>
             <button 
                onClick={() => addToCart(medicine)}
                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
             >
                <Plus className="w-4 h-4" />
                <span>Add</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
