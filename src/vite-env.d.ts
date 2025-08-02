interface ImportMetaEnv {
  readonly VITE_CUBES_API_URL: string;
  readonly NEXT_PUBLIC_CUBES_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
