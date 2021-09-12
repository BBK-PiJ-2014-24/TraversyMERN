import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = (props) => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((a) => (
      <div key={a.id} className={`alert alert-${a.type}`}>
        <i className="fas fa-info-circle" />
        {a.msg}
      </div>
    ))
  );
};

export default Alerts;
