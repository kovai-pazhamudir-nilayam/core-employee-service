exports.envSchema = {
  type: "object",
  properties: {
    DB_USER: {
      type: "string",
      default: "postgres"
    },
    DB_PASSWORD: {
      type: "string",
      default: "postgres"
    },
    DB_NAME: {
      type: "string",
      default: "postgres"
    },
    DB_HOST: {
      type: "string",
      default: "localhost"
    },
    DB_PORT: {
      type: "string",
      default: "5432"
    },
    DATASTORE_NAMESPACE: {
      type: "string"
    },
    CLOUD_BUCKET_NAME: {
      type: "string"
    },
    TRUEIN_BASE_URL: {
      type: "string"
    },
    SERVICE_BASE_URL: {
      type: "string"
    },
    GCP_PROJECT_ID: {
      type: "string"
    },
    GOOGLE_APPLICATION_CREDENTIALS: {
      type: "string"
    },
    GCP_ZONE: {
      type: "string"
    },
    TRUEIN_ACCESS_KEY_ID: {
      type: "string"
    },
    TRUEIN_SECRET_SUCCESS_KEY: {
      type: "string"
    },
    TRUEIN_GRANT_TYPE: {
      type: "string"
    },
    SUBSCRIPTION_KEY: {
      type: "string"
    }
  }
};
