import { Query } from "appwrite";
import { appwriteConfig, databases, ID } from "./config";

class DatabaseService {
  async createPortfolio(portfolioData) {
    try {
      return await databases.createDocument(
        appwriteConfig.databaseID,
        appwriteConfig.portfoliosCollectionId,
        ID.unique(),
        {
          ...portfolioData,
          $createdAt: new Date().toISOString(),
          $updatedAt: new Date().toISOString(),
          isPublic: false,
        }
      );
    } catch (err) {
      console.log("Error creating portfolio: " + err);
      throw err;
    }
  }

  async getPortfolio(portfolioId) {
    try {
      return await databases.getDocument(
        appwriteConfig.databaseID,
        appwriteConfig.projectsCollectionId,
        portfolioId
      );
    } catch (err) {
      console.log("Portfolio not found" + err);
    }
  }

  async getUserPortfolio(userId) {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.portfoliosCollectionId,
        [Query.equal("userId", userId)]
      );
      return response.documents[0] || null;
    } catch (err) {
      console.log(err);
    }
  }

  async getPublicPortfolio(customSlug) {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.portfoliosCollectionId,
        [Query.equal("customSlug", customSlug), Query.equal("isPublic", true)]
      );
      return response.documents[0] || null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updatePortfolio(portfolioId, updates) {
    try {
      return await databases.updateDocument(
        appwriteConfig.databaseID,
        appwriteConfig.portfoliosCollectionId,
        portfolioId,
        { ...updates, $updatedAt: new Date().toISOString() }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async deletPortfolio(portfolioId) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseID,
        appwriteConfig.portfoliosCollectionId,
        portfolioId
      );
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createProject(projectData) {
    try {
      return await databases.createDocument(
        appwriteConfig.databaseID,
        appwriteConfig.projectsCollectionId,
        ID.unique(),
        { ...projectData, $createdAt: new Date().toISOString() }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async getPortfolioProjects(portfolioId) {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.projectsCollectionId,
        [Query.equal("portfolioId", portfolioId), Query.orderDesc("order")]
      );
      return response.documents;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateProject(projectId, updates) {
    try {
      return await databases.updateDocument(
        appwriteConfig.databaseID,
        appwriteConfig.projectsCollectionId,
        projectId,
        updates
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteProject(projectId) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseID,
        appwriteConfig.projectsCollectionId,
        projectId
      );
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new DatabaseService();
