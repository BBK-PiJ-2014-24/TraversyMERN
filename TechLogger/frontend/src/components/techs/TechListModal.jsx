import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTechs } from "../../actions/techActions";
import TechItem from "./TechItem";

const TechListModal = (props) => {
  const {
    getTechs,
    tech: { techs, loading },
  } = props;

  useEffect(() => {
    getTechs();
    //eslint-disable-next-line
  }, []);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
          {techs !== null &&
            !loading &&
            techs.map((t) => <TechItem tech={t} key={t.id} />)}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getTechs })(TechListModal);
