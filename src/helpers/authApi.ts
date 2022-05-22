/* eslint-disable no-console */
import axios from "axios";

export const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/users/sign-in`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const singOut = async (token: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/users/sign-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.status === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const createUser = async (
  username: string,
  name: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/users`, {
      username,
      name,
      password,
      confirmPassword,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};
