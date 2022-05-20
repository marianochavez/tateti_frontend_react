import React, {createContext} from "react";
import {useState, useEffect} from "react";

import {createUser, signIn, singOut} from "../../helpers/authApi";

export interface Players {
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
  players: Players;
  isLogged: boolean;
  isLogged2: boolean;
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
  players: {},
  isLogged: false,
  isLogged2: false,
  login: () => Promise.resolve(false),
  logout: () => {},
  register: () => Promise.resolve(false),
});

export const UserProvider = ({children}: Props) => {
  const [players, setPlayers] = useState<Players>(
    JSON.parse(localStorage.getItem("players") || "{}"),
  );
  const [isLogged, setIsLogged] = useState<boolean>(
    players[parseInt(Object.keys(players)[0])] ? true : false,
  );
  const [isLogged2, setIsLogged2] = useState<boolean>(
    players[parseInt(Object.keys(players)[1])] ? true : false,
  );

  useEffect(() => {
    const playersData = JSON.parse(localStorage.getItem("players") || "{}");

    if (playersData) setPlayers(playersData);
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const login = async (username: string, password: string) => {
    const res = await signIn(username, password);

    if (res) {
      setPlayers({
        ...players,
        [res.data.id]: {
          username: res.data.username,
          name: res.data.name,
          token: res.data.token,
        },
      });
      isLogged ? setIsLogged2(true) : setIsLogged(true);

      return true;
    } else {
      return false;
    }
  };

  const logout = async (id: number) => {
    const player = parseInt(Object.keys(players)[id]);

    const logoutPl = await singOut(players[player].token);

    if (logoutPl) {
      // delete the player from the players object
      const newPlayers = {...players};

      delete newPlayers[player];
      setPlayers(newPlayers);

      // setLogged to false
      if (Object.keys(newPlayers).length === 0) {
        setIsLogged(false);
        setIsLogged2(false);
      } else setIsLogged2(false);
    }
  };

  const register = async (
    username: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) => {
    await createUser(username, name, password, confirmPassword);
  };

  return (
    <UserContext.Provider
      value={{
        players,
        isLogged,
        isLogged2,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
