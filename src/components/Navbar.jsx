'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'; // Make sure to install lucide-react
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
            <span className="text-2xl font-bold text-green-600 tracking-tight">MediKit</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition font-medium">Home</Link>
            
            {user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-green-600 transition font-medium">
                Admin Panel
              </Link>
            )}

            <Link href="/cart" className="relative text-gray-700 hover:text-green-600 transition">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-gray-800">Hi, {user.name}</span>
                <button onClick={logout} className="text-red-500 hover:text-red-700 transition" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-green-600 font-medium">Login</Link>
                <Link href="/register" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition shadow-sm font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <Link href="/cart" className="relative text-gray-700 hover:text-green-600 transition">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link href="/" className="block py-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Home</Link>
            {user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="block py-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Admin Panel</Link>
            )}
            {!user && (
              <>
                <Link href="/login" className="block py-2 text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/register" className="block py-2 text-green-600 font-bold hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
            {user && (
               <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left py-2 text-red-500 font-bold hover:bg-gray-50 rounded">
                 Logout
               </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
