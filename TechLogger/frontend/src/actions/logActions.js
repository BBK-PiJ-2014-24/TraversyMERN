import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "./types";

// export const getLogs = () => {
//   return async (dispatch) => {
//     setLoading();
//     const res = await fetch("http://localhost:5000/logs");
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data,
//     });
//   };
// };

// Get Logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add Log to server
export const addLog = (log) => async (dispatch) => {
  const config = {
    method: "POST",
    body: JSON.stringify(log),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();
    const res = await fetch("http://localhost:5000/logs", config);
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Update Log from server
export const updateLog = (log) => async (dispatch) => {
  const config = {
    method: "PUT",
    body: JSON.stringify(log),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();

    const res = await fetch(`http://localhost:5000/logs/${log.id}`, config);
    const data = await res.json();
    console.log(log);

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// SEARCH Logs from server
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`http://localhost:5000/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete Log from server
export const deleteLog = (id) => async (dispatch) => {
  const config = {
    method: "DELETE",
  };

  try {
    setLoading();

    await fetch(`http://localhost:5000/logs/${id}`, config);

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set Current Log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear Current Log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set Loading to True
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
