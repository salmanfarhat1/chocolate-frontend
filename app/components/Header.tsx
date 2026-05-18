import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header className="bg-[#48260D] shadow-sm border-b border-[#e8d5c4] text-[#c8a97e]">
      <div className="max-w-7xl h-25 mx-auto px-6">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="flex items-center space-x-3">
            {/* Replace with your logo - using text for now */}
            <div className="text-2xl font-bold ">
              Chocolate Shop
            </div>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link 
              href="/" 
              className=" hover:text-[#7a5a53] transition-colors font-medium"
            >
              Collections
            </Link>
            <Link 
              href="/create-chocolate" 
              className=" hover:text-[#7a5a53] transition-colors font-medium"
            >
              Custom Chocolate
            </Link>
            <Link 
              href="/create-chocolate" 
              className=" hover:text-[#7a5a53] transition-colors font-medium"
            >
              Our Lebanese Taste
            </Link>
            <Link 
              href="/" 
              className=" hover:text-[#7a5a53] transition-colors font-medium"
            >
              Contact
            </Link>
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
}