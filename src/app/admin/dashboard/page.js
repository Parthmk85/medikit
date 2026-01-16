'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tablet',
    problemType: 'Fever',
    price: '',
    description: '',
    imageUrl: '',
    inStock: true
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  const fetchMedicines = async () => {
    const res = await fetch('/api/medicines');
    const data = await res.json();
    setMedicines(data.medicines || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...formData, _id: editingId } : formData;

    const res = await fetch('/api/medicines', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        setFormData({
            name: '',
            category: 'Tablet',
            problemType: 'Fever',
            price: '',
            description: '',
            imageUrl: '',
            inStock: true
        });
        setEditingId(null);
        fetchMedicines();
    } else {
        alert('Failed to save medicine');
    }
  };

  const handleDelete = async (id) => {
      if(!confirm('Are you sure?')) return;
      const res = await fetch(`/api/medicines?id=${id}`, { method: 'DELETE' });
      if(res.ok) fetchMedicines();
  };

  const handleEdit = (med) => {
      setFormData({
          name: med.name,
          category: med.category,
          problemType: med.problemType,
          price: med.price,
          description: med.description,
          imageUrl: med.imageUrl,
          inStock: med.inStock
      });
      setEditingId(med._id);
      // Scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if(!user || user.role !== 'admin') return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Logged as Admin</span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {editingId ? <Edit2 className="w-5 h-5"/> : <Plus className="w-5 h-5"/>}
                    {editingId ? 'Edit Medicine' : 'Add New Medicine'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                        <input type="text" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required/>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option>Tablet</option>
                                <option>Syrup</option>
                                <option>Injection</option>
                                <option>Cream</option>
                                <option>Drops</option>
                            </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                             <input type="number" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem Type</label>
                        <input type="text" placeholder="e.g. Fever, Cold" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                            value={formData.problemType} onChange={e => setFormData({...formData, problemType: e.target.value})} required/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input type="text" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                            value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})}/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" rows="3"
                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} id="stock"/>
                        <label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock Available</label>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
                            {editingId ? 'Update' : 'Add Medicine'}
                        </button>
                         {editingId && (
                            <button type="button" onClick={() => {setEditingId(null); setFormData({...formData, name: '', price: ''})}} className="bg-gray-200 text-gray-700 px-4 rounded-lg font-bold">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>

        {/* List */}
        <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Inventory</h2>
            {loading ? <p>Loading...</p> : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600">Medicine</th>
                                    <th className="p-4 font-semibold text-gray-600">Category</th>
                                    <th className="p-4 font-semibold text-gray-600">Price</th>
                                    <th className="p-4 font-semibold text-gray-600">Stock</th>
                                    <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {medicines.map(med => (
                                    <tr key={med._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium text-gray-900">{med.name}</td>
                                        <td className="p-4 text-gray-600">{med.category}</td>
                                        <td className="p-4 text-gray-900 font-bold">₹{med.price}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${med.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {med.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => handleEdit(med)} className="text-blue-500 hover:bg-blue-50 p-1 rounded transition">
                                                <Edit2 className="w-4 h-4"/>
                                            </button>
                                            <button onClick={() => handleDelete(med._id)} className="text-red-500 hover:bg-red-50 p-1 rounded transition">
                                                <Trash2 className="w-4 h-4"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {medicines.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">No medicines found. Add some!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
