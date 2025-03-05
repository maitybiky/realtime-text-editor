import API from "@/lib/axios";

export const createDocument = async ({ docName, userId }) => {
  try {
    const response = await API.post("/docs", {
      content: "",
      name: docName,
      userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyDocuments = async (userId) => {
  try {
    const response = await API.get(`/docs?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDocumentData = async (docId) => {
  try {
    const response = await API.get(`/docs/${docId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addMember = async (docId, email) => {
  try {
    const response = await API.put(`/docs/${docId}`, {
      email,
    });
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
