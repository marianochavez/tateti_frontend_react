import React, {createContext} from "react";
import {useState, useEffect} from "react";

import {createUser, signIn, singOut} from "../../helpers/authApi";

export interface Player {
  [key: number]: {
    token: string;
    name: string;
    username: string;
  };
}

interface Props {
  children: React.ReactNode;
}

interface PlayerContext {
  player: Player;
  isLogged: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: (num: number) => void;
  register: (
    username: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) => Promise<any>;
}

export const UserContext = createContext<PlayerContext>({
  player: {},
  isLogged: false,
  login: () => Promise.resolve(false),
  logout: () => {},
  register: () => Promise.resolve(false),
});

export const UserProvider = ({children}: Props) => {
  const [player, setPlayer] = useState<Player>(JSON.parse(localStorage.getItem("player") || "{}"));
  const [isLogged, setIsLogged] = useState<boolean>(
    player[parseInt(Object.keys(player)[0])] ? true : false,
  );

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem("player") || "{}");

    if (playerData) setPlayer(playerData);
  }, []);

  useEffect(() => {
    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  const login = async (username: string, password: string) => {
    const res = await signIn(username, password);

    if (res) {
      setPlayer({
        [res.data.id]: {
          username: res.data.username,
          name: res.data.name,
          token: res.data.token,
        },
      });
      setIsLogged(true);

      return true;
    } else {
      return false;
    }
  };

  const logout = async (id: number) => {
    const pl = parseInt(Object.keys(player)[id]);

    const logoutPl = await singOut(player[pl].token);

    if (logoutPl) {
      setPlayer({});
      setIsLogged(false);
    }
  };

  const register = async (
    username: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      const res = await createUser(username, name, password, confirmPassword);

      return res.data;
    } catch (err) {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        player,
        isLogged,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
