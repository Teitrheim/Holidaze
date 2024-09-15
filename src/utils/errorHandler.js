export const handleApiError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.errors
      ? errorData.errors[0].message
      : "An error occurred";
    throw new Error(errorMessage);
  }
  return response.json();
};
