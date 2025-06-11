export function Background() {
  return (
    <div className="z-0 absolute w-full h-full overflow-hidden min-h-screen pointer-events-none">
      <div className="absolute top-0 -left-44 w-[500px] h-[500px] bg-gray-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -top-44 left-64 w-[500px] h-[500px] bg-gray-400 opacity-25 rounded-full blur-3xl"></div>
      <div className="absolute top-16 -right-44 w-[500px] h-[500px] bg-gray-400 opacity-35 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gray-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-44 right-1/4 w-[500px] h-[500px] bg-gray-400 opacity-25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-400 opacity-20 rounded-full blur-3xl"></div>
    </div>
  );
} 