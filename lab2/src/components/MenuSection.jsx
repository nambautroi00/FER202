import MenuItem from "./MenuItem";
import option1 from "../images/option1.png";
import option2 from "../images/option2.png";
import option3 from "../images/option3.png";
import option4 from "../images/option4.png";

export default function MenuSection() {
  const pizzas = [
    {
      name: "Margherita Pizza",
      price: "24.00",
      oldPrice: "40.00",
      img: option1,
      label: "SALE",
    },
    {
      name: "Mushroom Pizza",
      price: "25.00",
      img: option2,
    },
    {
      name: "Hawaiian Pizza",
      price: "30.00",
      img: option3,
      label: "NEW",
    },
    {
      name: "Pesto Pizza",
      price: "30.00",
      oldPrice: "50.00",
      img: option4,
      label: "SALE",
    },
  ];

  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <h2 className="mb-4">Our Menu</h2>
        <div className="row g-4">
          {pizzas.map((p, i) => (
            <MenuItem key={i} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
