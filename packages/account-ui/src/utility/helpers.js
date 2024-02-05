export const generateRandomKey = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};
