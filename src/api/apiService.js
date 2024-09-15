// src/api/apiService.js
const API_BASE_URL = "https://v2.api.noroff.dev";

const getHeaders = (isProtected = false) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
  };
  if (isProtected) {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const apiGet = async (endpoint, isProtected = false) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: getHeaders(isProtected),
  });
  return response;
};

export const apiPost = async (endpoint, data, isProtected = false) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(isProtected),
    body: JSON.stringify(data),
  });
  return response;
};

// Similarly for PUT, DELETE methods
