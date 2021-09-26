import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from "./types";

// Get Techs From Server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/techs");
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add a Technician to Server
export const addTech = (tech) => async (dispatch) => {
  const config = {
    method: "POST",
    body: JSON.stringify(tech),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();
    const res = await fetch("http://localhost:5000/techs", config);
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// DELETE Tech From Server
export const deleteTech = (id) => async (dispatch) => {
  const config = {
    method: "DELETE",
  };

  try {
    setLoading();
    await fetch(`http://localhost:5000/techs/${id}`, config);

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};
// Set Loading to True
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
