import { authAction } from "./auth-slice";

export const fetchUserData = (enteredEmail, enteredPassword) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const query = `?orderBy="user"&equalTo="${enteredEmail}"`;
      const response = await fetch(
        `https://foodease-backend-default-rtdb.firebaseio.com/users.json` +
          query
      );

      if (!response.ok) {
        dispatch(authAction.setError("Could not get userData"));
        throw new Error("Could Not get users Data");
      }

      const checkData = await response.json();
      return checkData;
    };
    try {
      const userData = await fetchData();

      if (Object.keys(userData).length === 0) {
        throw new Error("User does not exist");
      }
      for (const key in userData) {
        const { password } = userData[key].details;
        const userPassword = password.toString();
        if (userPassword === enteredPassword) {
          dispatch(
            authAction.login({ userName: userData[key].user, userId: key })
          );
          dispatch(authAction.setError(null));
          dispatch(authAction.setSuccess("Logged in Sucessfully"));
          return; // Exit the loop if login is successful
        }
      }

      // If the loop finishes without finding a matching user
      // dispatch(authAction.setError("Invalid password"));
      throw new Error("invalid password");
    } catch (err) {
      dispatch(authAction.setError(err.message));
    }
  };
};
