import React from "react";
import { Navigate } from "react-router-dom";

const Contact: React.FC = () => {
  React.useEffect(() => {
    window.location.href = "mailto:contact@reddragonrecords.tw";
  }, []);

  return <Navigate to="/home" replace />;
};

export default Contact;
