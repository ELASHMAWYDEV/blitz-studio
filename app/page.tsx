import { Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Zap className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold">Blitz</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-gray-600">WHO&apos;S BLITZ</a>
              <a href="#" className="text-gray-900 hover:text-gray-600">SERVICES</a>
              <a href="#" className="text-gray-900 hover:text-gray-600">CONTACT US</a>
              <a href="#" className="text-gray-900 hover:text-gray-600">GALLERY</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
          {/* Circular Text and Bird Image */}
          <div className="relative w-96 h-96 mb-12">
            <div className="absolute inset-0 animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="textPath"
                  d="M50,10 A40,40 0 1,1 49.9999,10"
                  fill="none"
                  className="text-black"
                />
                <text className="text-[8px]">
                  <textPath href="#textPath" startOffset="0%">
                    Redefining creativity, one frame at a time
                  </textPath>
                </text>
              </svg>
            </div>
            <img
              src="https://images.unsplash.com/photo-1557401622-cfc0aa5d146c?auto=format&fit=crop&q=80&w=300&h=300"
              alt="Bird with Rose"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48"
            />
          </div>

          {/* Tagline */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl font-bold">
              Beyond the surface, we delve into the depths of creativity.
            </h1>
            <p className="text-xl">
              Join us on this extraordinary journey
            </p>
            <p className="text-sm text-gray-600">
              Started at <span className="font-semibold">Cairo, Egypt</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}