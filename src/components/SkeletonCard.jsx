const SkeletonCard = () => {
  return (
    <div className="movie-card animate-pulse">
      <div
        className="w-full rounded-lg"
        style={{ height: "300px", background: "rgba(255,255,255,0.06)" }}
      />
      <div className="mt-4 space-y-2">
        <div
          className="rounded-md"
          style={{
            height: "16px",
            width: "80%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div className="flex gap-2 mt-2">
          <div
            className="rounded-md"
            style={{
              height: "12px",
              width: "40px",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div
            className="rounded-md"
            style={{
              height: "12px",
              width: "30px",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div
            className="rounded-md"
            style={{
              height: "12px",
              width: "35px",
              background: "rgba(255,255,255,0.04)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </ul>
  );
};

export default SkeletonCard;
