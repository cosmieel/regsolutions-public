/* eslint-disable import/no-default-export */
const viteApiUrl = import.meta.env.VITE_API_URL;
const viteBuilderApiUrl = import.meta.env.VITE_BUILDER_API_URL;
const viteAdminApiUrl = import.meta.env.VITE_ADMIN_API_URL;

export default {
  apiUrl: viteApiUrl,
  authApiUrl: `${viteApiUrl}/auth`,
  siteApiUrl: `${viteApiUrl}/site`,
  sitesAdminApiUrl: `${viteAdminApiUrl}/sites`,
  sslApiUrl: `${viteApiUrl}/ssl`,
  pageApiUrl: `${viteApiUrl}/page`,
  catalogApiUrl: `${viteApiUrl}/catalog`,
  userApiUrl: `${viteApiUrl}/user`,
  optionsApiUrl: `${viteApiUrl}/options`,
  builderApiUrl: `${viteBuilderApiUrl}/block`,
  menuApiUrl: `${viteBuilderApiUrl}/menu`,
};
