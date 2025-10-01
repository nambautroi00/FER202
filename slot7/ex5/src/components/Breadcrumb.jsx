export default function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb" className="container my-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Students
        </li>
      </ol>
    </nav>
  );
}
