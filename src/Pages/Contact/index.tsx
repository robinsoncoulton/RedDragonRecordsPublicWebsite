import React from "react";
import { Navigate } from "react-router-dom";
import { trackEvent } from "../../Analytics";

const Contact: React.FC = () => {
  React.useEffect(() => {
    trackEvent("generate_lead", { method: "mailto" });
    window.location.href = "mailto:contact@reddragonrecords.tw";
  }, []);

  return <Navigate to="/home" replace />;
};

export default Contact;
