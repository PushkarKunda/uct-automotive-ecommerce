import { Link } from 'react-router-dom';
import { ShoppingCart, User, Wrench } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Wrench className="w-8 h-8" />
          AutoParts Pro
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/cart" className="flex items-center gap-2 hover:text-blue-200 transition">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">Cart</span>
          </Link>
          <Link to="/login" className="flex items-center gap-2 hover:text-blue-200 transition">
            <User className="w-5 h-5" />
            <span className="font-medium">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
