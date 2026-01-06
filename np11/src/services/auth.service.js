import { account } from "../lib/appwrite";
import { ID } from "appwrite";

// signup
export const signup = (email, password, name) => {
  return account.create(ID.unique(), email, password, name);
};

// login
export const login = (email, password) => {
  return account.createEmailPasswordSession(email, password);
};

// get current user
export const getCurrentUser = () => {
  return account.get();
};

// logout
export const logout = () => {
  return account.deleteSession("current");
};
