import { appwriteConfig, ID, storage } from "./config";

class StorageService {
  async uploadFile(file) {
    try {
      return await storage.createFile(
        appwriteConfig.storageBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("Upload Failed: " + err);
      throw err;
    }
  }

  async deleteFile(fileId) {
    try {
      await storage.deleteFile(appwriteConfig.storageBucketId, fileId);
    } catch (err) {
      console.log("Delete Failed : " + err);
      throw err;
    }
  }

  getFilePreview(fileId, width = 40, height = 400) {
    return storage.getFilePreview(
      appwriteConfig.storageBucketId,
      fileId,
      width,
      height,
      "center", // crop position
      100, // quality
      0, // border width
      "", // border color
      0, // border radius
      1, // opacity
      0, // rotation
      "", // background color
      "webp" // output format
    );
  }

  getFileDownload(fileId) {
    return storage.getFileDownload(appwriteConfig.storageBucketId, fileId);
  }

  getFileView(fileId) {
    return storage.getFileView(appwriteConfig.storageBucketId, fileId);
  }
}

export default new StorageService();
