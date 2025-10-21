import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { isOn: false };

// 2. Định nghĩa hàm reducer
function toggleReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { isOn: !state.isOn };
    case 'turn_on':
      return { isOn: true };
    case 'turn_off':
      return { isOn: false };
    default:
      return state;
  }
}

function ToggleComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  // Action handlers
  const toggle = () => dispatch({ type: 'toggle' });

  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  return (
    <Card className="p-4">
      <h2>Bật/Tắt Trạng Thái</h2>
      <div className="mb-3">
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Trạng thái hiện tại: 
          <span style={{ 
            color: state.isOn ? 'green' : 'red',
            marginLeft: '10px'
          }}>
            {state.isOn ? 'BẬT' : 'TẮT'}
          </span>
        </p>
      </div>
      
      <div>
        <Button
          onClick={toggle}
          style={{ 
            ...buttonStyle, 
            background: state.isOn ? '#dc3545' : '#28a745', 
            color: 'white' 
          }}
        >
          {state.isOn ? 'Tắt' : 'Bật'}
        </Button>
        
      </div>
    </Card>
  );
}

export default ToggleComponent;
