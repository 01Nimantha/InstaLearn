export default function Header() {
    return (
      <header className="bg-green-500 p-4 lg:p-6 rounded">
        <div className="flex flex-col lg:flex-row lg:items-center max-w-7xl mx-auto">
          <div className="flex items-center ml-8 lg:ml-0">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Profile"
              className="w-32 h-32 lg:w-32 lg:h-32 rounded-full border-4 border-white"
            />
            <div className="ml-4 mt-10">
              <span className="text-3xl lg:text-3xl font-semibold text-white">Good Morning Miss.Maleesha!</span>
              <p className="text-green-100">AO_2025_10001</p>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:ml-auto text-white text-sm lg:text-base ml-8 lg:ml-0">
            September 12-22
          </div>
        </div>
      </header>
    );
  }