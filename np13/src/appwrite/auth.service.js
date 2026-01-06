import { account, ID } from "./config";

class AuthService {
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (err) {
      console.log(err);
    }
  }

  async login({ email, password }) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async logout() {
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.log(err);
    }
  }

  async updateProfile({ name }) {
    try {
      return await account.updateName(name);
    } catch (err) {
      console.log(err);
    }
  }

  async updateEmail({ email }) {
    try {
      return await account.updateEmail(email);
    } catch (err) {
      console.log(err);
    }
  }

  async updatePassword({ password }) {
    try {
      return await account.updatePassword(password);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthService();
