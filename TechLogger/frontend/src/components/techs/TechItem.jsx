import React from "react";
import { connect } from "react-redux";
import { deleteTech } from "../../actions/techActions";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize";

const TechItem = (props) => {
  const onDelete = () => {
    props.deleteTech(props.tech.id);
    M.toast({
      html: `${props.tech.firstName} ${props.tech.lastName} has been deleted`,
    });
  };

  return (
    <li className="collection-item">
      <div>
        {props.tech.firstName} {props.tech.lastName}
        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
