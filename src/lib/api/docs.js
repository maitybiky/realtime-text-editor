import API from "@/lib/axios";

export const createDocument = async () => {
  try {
    const response = await API.post("/docs", { content: "" });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getDocument = async (id) => {
  try {
    const response = await API.get(`/docs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateDocument = async (id, content) => {
  try {
    const response = await API.put(`/docs/${id}`, { content });
    return response.data;
  } catch (error) {
    throw error;
  }
};
