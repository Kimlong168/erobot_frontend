const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-8 h-8 border-4 border-secondary dark:border-white/90 rounded-full animate-spin"
      ></div>
      <p className="ml-2 text-gradient text-secondary dark:text-white/90">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
