export const getJson: <T>(key: any) => T | null = <T>(key: any) => {
  const state = sessionStorage.getItem(key);
  return !!state ? (JSON.parse(state) as T) : null;
};

export const storeJson = (key: any, json: any) => {
  sessionStorage.setItem(key, JSON.stringify(json));
};
