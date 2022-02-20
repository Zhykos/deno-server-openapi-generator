import { join, path } from "./deps.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const customConfig = {
  ROOT_DIR: __dirname,
  URL_PORT: 3000,
  URL_PATH: "http://localhost",
  BASE_VERSION: "/v2",
  CONTROLLER_DIRECTORY: join(__dirname, "controllers"),
  PROJECT_DIR: __dirname,
};

export const config = {
  OPENAPI_YAML: join(customConfig.ROOT_DIR, "api", "openapi.yaml"),
  FULL_PATH:
    `${customConfig.URL_PATH}:${customConfig.URL_PORT}/${customConfig.BASE_VERSION}`,
  FILE_UPLOAD_PATH: join(customConfig.PROJECT_DIR, "uploaded_files"),
};
