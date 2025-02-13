const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/", {
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Auth check response:", data); // Debug log
      dispatch(setUser(data));
      return data;
    }
  } catch (error) {
    console.error("Auth check error:", error);
    dispatch(removeUser());
  }
};

// export const thunkLogin = (credentials) => async (dispatch) => {
//   try {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       if (data.errors) throw data.errors;
//     }

//     const user = await response.json();
//     dispatch(setUser(user));
//     return null;
//   } catch (errors) {
//     return errors;
//   }
// };

export const thunkLogin = (credentials) => async (dispatch) => {
  try {
    console.log("Login credentials:", credentials); // Debug log

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // Important for session cookies
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    console.log("Login response data:", data); // Debug log

    if (response.ok) {
      dispatch(setUser(data));
      return data;
    } else {
      return data; // This will contain any error messages
    }
  } catch (error) {
    console.error("Login error:", error);
    return { errors: ['An error occurred during login'] };
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}




export default sessionReducer;
