import { setUser, setLoading, setError, clearUser, setToken, setRefreshToken } from './authSlice';

export const loginUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true))

  try {
    // Make an API request to the login endpoint

    // https://api.bucollections.com/
    const response = await fetch('https://api.bucollections.com/login', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    // console.log(data)

    if (response.ok) {
      // Store tokens in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Dispatch actions with serializable data
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      dispatch(setRefreshToken(data.refreshToken));
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError('An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  // Clear tokens from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');

  // Clear the user from the store
  dispatch(clearUser());
};
