export const fetchRequest = async ({ url, options = {} }) => {
  const fetchParameters = {
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, fetchParameters);

    try {
      const result = await response.json();

      if (result?.code) {
        throw new Error(result?.code);
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      if (response.status >= 200 && response.status < 300) {
        return true;
      }

      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
