import React, { createContext, useContext, useState, useEffect } from "react";
import { IUser, IAuthResponse } from "../utils/types";
import {
  requestNewAccessToken,
  retrieveUserInfo,
} from "./requestNewAccessToken";
// // Definimos el tipo para el contexto de autenticación
// interface IAuthContext {
//   user: IUser | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// // Creamos el contexto de autenticación
// const AuthContext = createContext<IAuthContext>({
//   user: null,
//   isAuthenticated: false,
//   login: async () => {},
//   logout: () => {},
// });

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   console.log("en Provider");

//   const [user, setUser] = useState<IUser | null>(null);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post("/user/login", { email, password });
//       console.log(response, "holaaaaa");
//       const userData = response.data.user;
//       console.log(userData,"oahsdhiohoaisd");
//       setUser(userData);
//     } catch (error) {
//       console.error("Error during login:", error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   // Verificar si el usuario está autenticado
//   const isAuthenticated = !!user;
//   console.log(isAuthenticated);

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// const AuthContext = createContext({
//   isAuthenticated: false,
//   getAccessToken: () => {},
//   setAccessTokenAndRefreshToken: (
//     _accessToken: string,
//     _refreshToken: string
//   ) => {},
//   getRefreshToken: () => {},
//   saveUser: (_userData: IAuthResponse) => {},
//   getUser: () => ({} as IUser | undefined),
//   signout: () => {},
// });

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<IUser | undefined>();
//   const [accessToken, setAccessToken] = useState<string>("");
//   const [refreshToken, setRefreshToken] = useState<string>("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isloading, setIsLoading] = useState(true);

//   function getAccessToken() {
//     return accessToken;
//   }

//   function saveUser(userData: IAuthResponse) {
//     setAccessTokenAndRefreshToken(userData.accessToken, userData.refreshToken);
//     setUser(userData.user);
//     setIsAuthenticated(true);
//   }

//   function setAccessTokenAndRefreshToken(
//     accessToken: string,
//     refreshToken: string
//   ) {
//     console.log("setAccessTokenAndRefreshToken", accessToken, refreshToken);
//     setAccessToken(accessToken);
//     setRefreshToken(refreshToken);

//     localStorage.setItem("token", JSON.stringify({ refreshToken }));
//   }

//   function getRefreshToken() {
//     if (!!refreshToken) {
//       return refreshToken;
//     }
//     const token = localStorage.getItem("token");
//     if (token) {
//       const { refreshToken } = JSON.parse(token);
//       setRefreshToken(refreshToken);
//       return refreshToken;
//     }
//     return null;
//   }

//   async function getNewAccessToken(refreshToken: string) {
//     const token = await requestNewAccessToken(refreshToken);
//     if (token) {
//       return token;
//     }
//   }

//   function getUser(): IUser | undefined {
//     return user;
//   }

//   function signout() {
//     localStorage.removeItem("token");
//     setAccessToken("");
//     setRefreshToken("");
//     setUser(undefined);
//     setIsAuthenticated(false);
//   }

//   async function checkAuth() {
//     try {
//       if (!!accessToken) {
//         //existe access token
//         const userInfo = await retrieveUserInfo(accessToken);
//         setUser(userInfo);
//         setAccessToken(accessToken);
//         setIsAuthenticated(true);
//         setIsLoading(false);
//       } else {
//         //no existe access token
//         const token = localStorage.getItem("token");
//         if (token) {
//           console.log("useEffect: token", token);
//           const refreshToken = JSON.parse(token).refreshToken;
//           //pedir nuevo access token
//           getNewAccessToken(refreshToken)
//             .then(async (newToken) => {
//               const userInfo = await retrieveUserInfo(newToken!);
//               setUser(userInfo);
//               setAccessToken(newToken!);
//               setIsAuthenticated(true);
//               setIsLoading(false);
//             })
//             .catch((error) => {
//               console.log(error);
//               setIsLoading(false);
//             });
//         } else {
//           setIsLoading(false);
//         }
//       }
//     } catch (error) {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         getAccessToken,
//         setAccessTokenAndRefreshToken,
//         getRefreshToken,
//         saveUser,
//         getUser,
//         signout,
//       }}
//     >
//       {isloading ? <div>Loading...</div> : children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
