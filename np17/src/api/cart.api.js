import axiosInstance from "./axios";

const getAllCarts = async () => {
  try {
    const response = await axiosInstance.get("/carts");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get cart items ${error}`);
  }
};

const createCart = async ()
