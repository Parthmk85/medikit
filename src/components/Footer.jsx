export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MediKit. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-green-500 transition">Terms</a>
          <a href="#" className="text-gray-400 hover:text-green-500 transition">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-green-500 transition">Contact</a>
        </div> 
      </div>
    </footer>
  );
}
