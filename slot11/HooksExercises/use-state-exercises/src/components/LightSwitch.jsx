// LightSwitch component using useState to toggle light on and off
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function LightSwitch() {
  // Khởi tạo state: isLightOn là boolean, khởi tạo giá trị ban đầu là false (tắt)
  const [isLightOn, setIsLightOn] = useState(false);

  // Hàm để chuyển đổi trạng thái đèn
  const toggleLight = () => setIsLightOn((prev) => !prev); // đảo trạng thái hiện tại

  // Style chung cho các button
  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        Đèn hiện đang: {isLightOn ? "Bật" : "Tắt"}
      </p>
      <Button
        onClick={toggleLight}
        style={{
          ...buttonStyle,
          background: isLightOn ? "red" : "green",
          color: "white",
        }}
      >
        {isLightOn ? "Tắt Đèn" : "Bật Đèn"}
      </Button>
    </div>
  );
}

export default LightSwitch;
