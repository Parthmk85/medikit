'use client';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    // Fun message as requested by user
    toast.success("Order add thai gayo che! Payment gateway add thai tayare ghare mokli daish bye! 👋", {
        duration: 5000,
        icon: '💊'
    });
    
    // Simulate order processing time then clear cart and redirect
    setTimeout(() => {
        clearCart();
        router.push('/');
    }, 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any medicines yet.</p>
        <Link href="/" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart ({cart.length} items)</h1>
        {cart.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" /> : <span className="font-bold text-gray-300">Rx</span>}
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">{item.name}</h3>
                 <p className="text-sm text-gray-500">{item.category}</p>
                 <span className="font-bold text-green-600 block mt-1">₹{item.price}</span>
               </div>
            </div>

            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item._id, -1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Minus className="w-4 h-4 text-gray-600" /></button>
                  <span className="font-semibold text-gray-800 w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Plus className="w-4 h-4 text-gray-600" /></button>
               </div>
               <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 transition p-2">
                 <Trash2 className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
         <button onClick={clearCart} className="text-red-500 text-sm font-medium hover:underline mt-4">Clear Cart</button>
      </div>

      <div className="md:col-span-1">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
            </div>
            <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
            >
                Checkout
            </button>
         </div>
      </div>
    </div>
  );
}
