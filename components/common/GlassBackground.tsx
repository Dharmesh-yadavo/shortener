export const GlassBackground = ({ opacity }: { opacity: number }) => {
  return (
    <div className="absolute inset-0 -z-1 overflow-hidden pointer-events-none">
      {/* Pink Blob */}
      <div
        style={{ opacity: opacity }}
        className="blob absolute -top-50 right-37.5 w-125 h-100 bg-pink-200 "
      ></div>

      {/* Orange Blob */}
      <div
        style={{ opacity: opacity }}
        className="blob absolute -right-37.5 bottom-50 w-75 h-75 bg-teal-300 animation-delay-2000 "
      ></div>
    </div>
  );
};
