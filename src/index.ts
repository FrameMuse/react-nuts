declare global {
  interface ProcessEnv {
    NODE_ENV: "development" | "production"
  }
}

export { }