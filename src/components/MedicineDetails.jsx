'use client';
import { useCart } from '@/context/CartContext';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function MedicineDetails({ medicine }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="h-96 bg-gray-50 rounded-2xl flex items-center justify-center p-8">
             {medicine.imageUrl ? <img src={medicine.imageUrl} alt={medicine.name} className="max-h-full max-w-full object-contain" /> : <div className="text-6xl text-gray-300 font-bold">Rx</div>}
        </div>
        
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">{medicine.category}</span>
                <span className="text-gray-500 text-sm border px-3 py-1 rounded-full">{medicine.problemType}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">{medicine.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{medicine.description || 'No description available.'}</p>

            <div className="flex items-center space-x-2">
                {medicine.inStock ? (
                    <span className="flex items-center text-green-600 font-medium"><CheckCircle className="w-5 h-5 mr-1"/> In Stock</span>
                ) : (
                    <span className="flex items-center text-red-600 font-medium"><AlertCircle className="w-5 h-5 mr-1"/> Out of Stock</span>
                )}
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-4xl font-bold text-gray-900">₹{medicine.price}</span>
                <button 
                  onClick={() => addToCart(medicine)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition transform hover:-translate-y-1 flex items-center"
                >
                  <Plus className="w-6 h-6 mr-2" />
                  Add to Cart
                </button>
            </div>
            
            <div className="pt-4">
                 <Link href="/" className="text-gray-500 hover:text-green-600 font-medium text-sm">← Back to Overview</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
