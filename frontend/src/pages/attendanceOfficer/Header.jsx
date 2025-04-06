export default function Header({ name, officerId, image, showButton, action , className, showButton2, action2}) {

  const headerClasses = `${className || ''} p-4 lg:p-6 rounded`.trim();

  return (
    <header className={headerClasses}>
      <div className="flex flex-col lg:flex-row lg:items-center max-w-7xl mx-auto">
        <div className="flex items-center ml-8 lg:ml-0">
          <img
            src={image || "https://th.bing.com/th/id/OIP.ZMB81W_uLDsEIxaMWxDljAHaHa?rs=1&pid=ImgDetMain"}
            alt="Profile"
            className="w-32 h-32 lg:w-32 lg:h-32 rounded-full border-4 border-white"
          />
          <div className="ml-4 mt-10">
            <span className="text-3xl lg:text-3xl font-semibold text-white">{name}</span>
            <p className="text-green-100">{officerId}</p>
          </div>
        </div>
        <div className="flex mt-4 lg:mt-0 lg:ml-auto text-white text-sm lg:text-base ml-8 lg:ml-0 items-center gap-4">
          {/* Add date if you want to keep it */}
          {showButton && (
            <button
              onClick={action2}
              className="flex ml-4 bg-white text-black px-4 py-2 rounded"
            >
              Add Notice
            </button>
          )}
          {showButton2 && (
            <button
              onClick={action}
              className="ml-4 bg-white text-black px-4 py-2 rounded"
            >
              Add Class
            </button>
          )}
        </div>
      </div>
    </header>
  );
}