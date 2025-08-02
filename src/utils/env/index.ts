const getEnv = (key: keyof ImportMetaEnv): string => {
  const env =
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    key in import.meta.env
      ? import.meta.env[key]
      : process.env[key];

  if (!env || env === "__not_found") {
    throw new Error(`${key} is not defined in your environment`);
  }

  return env;
};

export const env = {
  apiUrl:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    "VITE_CUBES_API_URL" in import.meta.env
      ? getEnv("VITE_CUBES_API_URL")
      : getEnv("NEXT_PUBLIC_CUBES_API_URL"),
};
