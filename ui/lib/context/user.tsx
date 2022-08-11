import { createContext, useContext } from "react";

interface User {
  isLexicographer: boolean
}

// TODO: this should be moved to /lib
export const UserContext = createContext<User>({
  isLexicographer: true
});
export const useUserContext = () => useContext(UserContext);
