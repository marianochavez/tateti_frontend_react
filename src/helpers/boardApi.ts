/* eslint-disable no-console */
import axios from "axios";

export const createBoard = async (token: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/boards`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const joinGame = async (token: string, boardToken: string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/boards/join-game`,
      {
        token: boardToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const play = async (boardId: number, token: string, position: number) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/boards/${boardId}/play`,
      {
        index: position,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const historical = async (idPlayer1: number, idPlayer2: number): Promise<any> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/boards/historical`,
      {
        id_1: idPlayer1,
        id_2: idPlayer2,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const leave = async (boardId: number, token: string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/boards/${boardId}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const show = async (boardId: number, token: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/boards/${boardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
