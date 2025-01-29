const SET_DASHBOARD = "admin/setDashboard";

const setDashboard = (data) => ({
  type: SET_DASHBOARD,
  payload: data,
});

export const fetchAdminDashboard = () => async (dispatch) => {
  try {
    const response = await fetch("/api/admin/dashboard", {
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setDashboard(data));
    } else {
      console.error("Failed to fetch admin dashboard data");
    }
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
  }
};

const initialState = {
  metrics: {},
  pendingEvents: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARD:
      return {
        ...state,
        metrics: action.payload.metrics,
        pendingEvents: action.payload.pending_events,
      };
    default:
      return state;
  }
};

export default adminReducer;
