export interface UserContextType {
  login: string | null;
  setLogin: (login: string | null) => void;
}
