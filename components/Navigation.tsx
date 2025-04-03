import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="w-full top-0 bg-white/80 backdrop-blur-sm z-50 mt-10 font-arial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/blitz-logo.png" alt="Blitz" width={120} height={120} />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-gray-600 font-bold">
              WHO&apos;S BLITZ
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-600 font-bold">
              SERVICES
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-600 font-bold">
              CONTACT US
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-600 font-bold">
              GALLERY
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
