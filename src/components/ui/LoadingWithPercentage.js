const LoadingWithPercentage = ({ percentage }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-48 sm:w-56 md:w-64 h-4 ${
          percentage == 100 ? "" : " bg-gray-800 "
        } relative`}
      >
        <div
          className={`absolute top-0 left-0 h-full bg-blue-500  ${
            percentage == 100 ? " w-[100%] " : ""
          } transition-all  ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="absolute  top-0 left-0 w-full h-full flex items-center justify-center text-white font-bold text-sm">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default LoadingWithPercentage;
