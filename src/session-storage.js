export const getJson = (key) => {
  const state = sessionStorage.getItem(key);
  return state && JSON.parse(state);
};

export const storeJson = (key, josn) => {
  sessionStorage.setItem(key, JSON.stringify(josn));
};
