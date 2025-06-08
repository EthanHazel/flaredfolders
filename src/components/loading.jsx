import "@/styles/loading.css";

export default function Loading({ size = 32 }) {
  return (
    <div className="loader-container" style={{ width: size, height: size }}>
      <span
        className="loader"
        style={{
          width: size / 2,
          height: size / 2,
          border: size / 20 + "px solid var(--tertiary)",
          borderBottomColor: "transparent",
        }}
      ></span>
    </div>
  );
}
