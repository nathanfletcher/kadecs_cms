module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook:
        env('DEPLOY_HOOK_VERCEL','https://my-deployhook.vercel.com'),
      apiToken: env('API_TOKEN_VERCEL','my-vercel-api-token'),
      appFilter: env('APP_FILTER_VERCEL','my-vercel-app-filter'),
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
});