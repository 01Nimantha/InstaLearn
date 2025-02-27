import { ChevronDown } from 'lucide-react';

export default function ClassSelector({ selectedClass, isDropdownOpen, setIsDropdownOpen, setSelectedClass, classes }) {
  return (
    <div className="mb-8">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white p-3 lg:p-4 rounded-lg shadow flex items-center justify-between"
        >
          <span className="text-base lg:text-lg truncate">{selectedClass}</span>
          <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
            {classes.map((classItem) => (
              <button
                key={classItem}
                onClick={() => {
                  setSelectedClass(classItem);
                  setIsDropdownOpen(false);
                }}
                className={`w-full p-3 lg:p-4 text-left hover:bg-gray-50 text-sm lg:text-base ${
                  selectedClass === classItem ? 'bg-green-50 text-green-600' : ''
                }`}
              >
                {classItem}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}