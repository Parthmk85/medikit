'use client';
import { useState, useEffect } from 'react';
import MedicineCard from '@/components/MedicineCard';
import { Search, Filter } from 'lucide-react';

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [problemType, setProblemType] = useState('');

  const problemTypes = ['Fever', 'Cold', 'Pain', 'Diabetes', 'BP', 'Allergy', 'Vitamin'];
  const categories = ['Tablet', 'Syrup', 'Injection', 'Cream', 'Drops'];

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (problemType) params.append('problemType', problemType);

      const res = await fetch(`/api/medicines?${params.toString()}`);
      const data = await res.json();
      if (data.medicines) {
        setMedicines(data.medicines);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
        fetchMedicines();
    }, 300); // Debounce
    return () => clearTimeout(timeout);
  }, [search, category, problemType]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-green-600 rounded-3xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden">
         <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Your Health, <br/>Our Priority</h1>
            <p className="text-green-100 text-lg mb-8">Get authentic medicines delivered to your doorstep. Safe, fast, and reliable.</p>
            <div className="bg-white rounded-xl p-2 flex shadow-xl max-w-lg">
                <Search className="text-gray-400 w-6 h-6 ml-3 self-center" />
                <input 
                    type="text" 
                    placeholder="Search for medicines..." 
                    className="flex-grow p-3 outline-none text-gray-700 placeholder-gray-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
                    Find
                </button>
            </div>
         </div>
         {/* Decorative Circle */}
         <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-green-500 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
             <Filter className="w-5 h-5" />
             <span>Filters:</span>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select 
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 outline-none"
                value={problemType}
                onChange={(e) => setProblemType(e.target.value)}
            >
                <option value="">All Health Problems</option>
                {problemTypes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading medicines...</div>
      ) : medicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.map((med) => (
            <MedicineCard key={med._id} medicine={med} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">No medicines found matching your criteria.</p>
            <button onClick={() => {setSearch(''); setCategory(''); setProblemType('')}} className="mt-4 text-green-600 hover:underline">Clear Filters</button>
        </div>
      )}
    </div>
  );
}
