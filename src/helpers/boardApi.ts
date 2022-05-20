/* eslint-disable no-console */
import axios from "axios";

export const createBoard = async (token: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/boards",
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

export const joinGame = async (boardId: number, token: string) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/boards/${boardId}/join-game`,
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

export const play = async (boardId: number, token: string, position: number) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/boards/${boardId}/play`,
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
    const response = await axios.post(`http://localhost:8080/api/v1/boards/historical`, {
      id_1: idPlayer1,
      id_2: idPlayer2,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const leave = async (boardId: number, token: string) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/boards/${boardId}/leave`,
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
