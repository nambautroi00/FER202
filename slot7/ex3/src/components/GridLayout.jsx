export default function GridLayout() {
  return (
    <div className="container my-4">
      {/* Hàng 1 */}
      <div className="row mb-2">
        <div className="col border">First col</div>
        <div className="col border">Second col</div>
      </div>

      {/* Hàng 2 */}
      <div className="row mb-2">
        <div className="col border">col</div>
        <div className="col border">col</div>
        <div className="col border">col</div>
      </div>

      {/* Hàng 3 */}
      <div className="row mb-2">
        <div className="col border">col</div>
        <div className="col border">col</div>
        <div className="col border">col</div>
        <div className="col border">col</div>
      </div>
    </div>
  );
}
