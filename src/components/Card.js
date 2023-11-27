// Card.js
import React from "react";
import { Card } from "antd";
// import {
//   CheckCircleOutlined,
//   ExclamationCircleOutlined,
//   UserOutlined,
// } from "@ant-design/icons";

// function CardComponent({ title, description, buttonText }) {
//   return (
//     <Card className="card">
//       <div className="card-body">
//         <h5 className="card-title">
//           <CheckCircleOutlined
//             style={{ marginRight: "5px", color: "#52c41a" }}
//           />
//           {title}
//         </h5>
//         <p className="card-text">
//           <ExclamationCircleOutlined
//             style={{ marginRight: "5px", color: "#faad14" }}
//           />
//           {description}
//         </p>
//         <a href="#" className="btn btn-primary">
//           <UserOutlined style={{ marginRight: "5px" }} />
//           {/* {buttonText} */}
//         </a>
//       </div>
//     </Card>
//   );
// }

import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const StyledIcon = ({ icon, style }) => (
  <span style={{ marginRight: "5px", ...style }}>{icon}</span>
);

function CardComponent({ title, description, buttonText }) {
  return (
    <Card className="card">
      <div className="card-body">
        <h5 className="card-title">
          <StyledIcon
            icon={<CheckCircleOutlined />}
            style={{ color: "#52c41a" }}
          />
          {title}
        </h5>
        <p className="card-text">
          <StyledIcon
            icon={<ExclamationCircleOutlined />}
            style={{ color: "#faad14" }}
          />
          {description}
        </p>
        <button className="btn btn-primary">
          <StyledIcon icon={<UserOutlined />} />
          {buttonText}
        </button>
      </div>
    </Card>
  );
}

export default CardComponent;
