import axios from "./axios";

export const getProducts = async () => {
  try {
    const res = await axios.get("/Home/getProduct");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addToCart = async (productId) => {
  try {
    const res = await axios.post(`/Home/addToCart/${productId}`);
    return res.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
    return null;
  }
};

export const getCartItems = async () => {
  try {
    const res = await axios.get("/Home/getCartItems");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
