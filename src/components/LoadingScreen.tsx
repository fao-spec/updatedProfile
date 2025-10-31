export const OrbitSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50">
      <div className="relative w-16 h-16">
        {/* Outer pulsing glow */}
        <div className="absolute inset-0 border-4 border-violet-500 rounded-full animate-ping opacity-20"></div>

        {/* Rotating ring */}
        <div className="absolute inset-0 border-4 border-violet-400 rounded-full border-t-transparent animate-spin"></div>

        {/* Center glow orb */}
        <div className="absolute inset-3 rounded-full blur-md opacity-70"></div>
      </div>
    </div>
  );
};
