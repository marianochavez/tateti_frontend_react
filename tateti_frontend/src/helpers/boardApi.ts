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
