export const thunkLogin = (credentials) => async dispatch => {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(setUser(data));
            return data;
        } else {
            // Return errors if login failed
            return {
                errors: data.errors || ["Login failed"]
            };
        }
    } catch (error) {
        console.error("Login thunk error:", error);
        return {
            errors: ["An error occurred during login"]
        };
    }
};
