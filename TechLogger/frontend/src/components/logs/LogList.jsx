import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoader from "../layout/PreLoader";
import LogItem from "./LogItem";
import { getLogs } from "../../actions/logActions";

const LogList = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  // const getLogs = async () => {
  //   setLoading(true);
  //   const res = await fetch("http://localhost:5000/logs");
  //   const data = await res.json();

  //   setLogs(data);
  //   setLoading(false);
  // };

  if (loading || logs === null) {
    return <PreLoader />;
  }

  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4 className="center">Systems Logs</h4>
        </li>
        {!loading && logs.length === 0 ? (
          <p className="center">No Logs</p>
        ) : (
          logs.map((log) => <LogItem log={log} key={log.id} />)
        )}
      </ul>
    </div>
  );
};

LogList.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

// Redux method to bring in state via props
const mapStateToProps = (state) => ({
  log: state.log,
});

// redux uses connect() to bring in state and actions as arguments
// state is brought in via props via mapsStateToProps
// action fn also added as a object
export default connect(mapStateToProps, { getLogs })(LogList);
