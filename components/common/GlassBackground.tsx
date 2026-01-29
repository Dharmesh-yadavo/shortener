export const GlassBackground = ({ opacity }: { opacity: number }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f8fafc]">
      {/* Top-right emerald glow */}
      <div
        style={{ opacity: opacity }}
        className="blob absolute top-[-10%] right-[-5%] h-150 w-100 rounded-full bg-emerald-400/40 blur-[60px]"
      />
    </div>
  );
};
