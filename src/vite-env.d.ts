/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CDN_BASE_URL?: string;
  readonly VITE_AUTH_TOKEN_LS_KEY_NAME?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
