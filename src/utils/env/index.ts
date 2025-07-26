const getEnv = (key: keyof ImportMetaEnv) => {
  const env = import.meta.env[key];
  if (!env) {
    throw new Error(`${key} is not defined in your environment`);
  }
  return env;
};
export const env: { apiUrl: string } = {
  apiUrl: getEnv("VITE_CUBES_API_URL"),
};
