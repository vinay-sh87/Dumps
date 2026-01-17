import axiosInstance from "./axios";

const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error.message}`);
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get product " + error.message);
  }
};

const addProduct = async (product) => {
  try {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add product ` + error.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    await axiosInstance.delete(`/products/${productId}`);
    return { success: true, message: "product deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete the product " + error.message);
  }
};

const updateProduct = async (productId, product) => {
  try {
    const response = await axiosInstance.put(`/products/${productId}`, product);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update the product" + error.message);
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};
