import AuthPage from '../auth/views/auth-page.vue';
import BuilderFrame from '../builder-frame/views/builder-frame.vue';
import SitePreviewFrame from '../builder-frame/views/site-preview-frame.vue';
import PageNotFound from '../components/views/page-not-found.vue';
import ProfileSettings from '../profile/views/profile-settings.vue';
import SiteConfigurationAnalytics from '../site-configuration/views/site-configuration-analytics.vue';
import SiteConfigurationBasic from '../site-configuration/views/site-configuration-basic.vue';
import SiteConfigurationCart from '../site-configuration/views/site-configuration-cart.vue';
import SiteConfigurationCatalogCreate from '../site-configuration/views/site-configuration-catalog-create.vue';
import SiteConfigurationCatalogSettings from '../site-configuration/views/site-configuration-catalog-settings.vue';
import SiteConfigurationCatalogs from '../site-configuration/views/site-configuration-catalogs.vue';
import SiteConfigurationDomain from '../site-configuration/views/site-configuration-domain.vue';
import SiteConfigurationMenu from '../site-configuration/views/site-configuration-menu.vue';
import SiteConfigurationPage from '../site-configuration/views/site-configuration-page.vue';
import SiteConfigurationSubscriptions from '../site-configuration/views/site-configuration-subscriptions.vue';
import UserAccount from '../user-account/views/user-account.vue';
import SitePreSurvey from '../user-sites/views/site-pre-survey.vue';
import UserSitesEmpty from '../user-sites/views/user-sites-empty.vue';
import UserSites from '../user-sites/views/user-sites.vue';
import {
  WizardStepBusiness,
  WizardStepColor,
  WizardStepDescription,
  WizardStepDomain,
  WizardStepLogo,
  WizardMain,
  WizardStepSuccess,
  WizardWelcome,
  WizardStepName,
} from '../wizard/index.js';

const pageNotFoundRoutes = {
  path: '/:pathMatch(.*)*',
  name: 'pageNotFound',
  component: PageNotFound,
};

const authRoutes = {
  path: '/signup',
  name: 'signup',
  component: AuthPage,
};

const frameRoutes = [
  {
    path: '/:siteId/frame/:pageId',
    name: 'frame',
    component: BuilderFrame,
  },
  {
    path: '/:siteId/frame/:pageId/preview',
    name: 'framePagePreview',
    component: SitePreviewFrame,
  },
];

const wizardRoutes = [
  {
    path: '/wizard/welcome',
    name: 'wizardWelcome',
    component: WizardWelcome,
  },
  {
    path: '/wizard',
    component: WizardMain,
    redirect: { name: 'wizardWelcome' },
    children: [
      {
        path: '1',
        name: 'wizardStepBusiness',
        component: WizardStepBusiness,
      },
      {
        path: '2',
        name: 'wizardStepName',
        component: WizardStepName,
      },
      {
        path: '3',
        name: 'wizardStepDomain',
        component: WizardStepDomain,
      },
      {
        path: '4',
        name: 'wizardStepLogo',
        component: WizardStepLogo,
      },
      {
        path: '5',
        name: 'wizardStepColor',
        component: WizardStepColor,
      },
      {
        path: '6',
        name: 'wizardStepDescription',
        component: WizardStepDescription,
      },
      {
        path: 'success',
        name: 'wizardStepSuccess',
        component: WizardStepSuccess,
      },
    ],
  },
];

const accountRoutes = [
  {
    path: '/presurvey',
    name: 'accountSitePreSurvey',
    component: SitePreSurvey,
  },
  {
    path: '/',
    component: UserAccount,
    redirect: { name: 'accountMain' },
    children: [
      {
        path: 'main',
        name: 'accountMain',
        component: UserSites,
      },
      {
        path: 'main/empty',
        name: 'accountMainEmpty',
        component: UserSitesEmpty,
      },
      {
        path: 'configuration/:siteId',
        name: 'accountSiteConfiguration',
        redirect: { name: 'siteConfigurationBasic' },
        children: [
          {
            path: 'basic',
            name: 'siteConfigurationBasic',
            components: {
              default: SiteConfigurationBasic,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'domain',
            name: 'siteConfigurationDomain',
            components: {
              default: SiteConfigurationDomain,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'subscriptions',
            name: 'siteConfigurationSubscriptions',
            meta: {
              hiddenForAdmin: {
                value: true,
                redirect: 'siteConfigurationBasic',
              },
            },
            components: {
              default: SiteConfigurationSubscriptions,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'orders',
            name: 'siteConfigurationCart',
            components: {
              default: SiteConfigurationCart,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'catalogs',
            name: 'siteConfigurationCatalogs',
            components: {
              default: SiteConfigurationCatalogs,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'catalogAdd',
            name: 'siteConfigurationCatalogCreate',
            components: {
              default: SiteConfigurationCatalogCreate,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'catalogSettings/:catalogId',
            name: 'siteConfigurationCatalogSettings',
            components: {
              default: SiteConfigurationCatalogSettings,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'analytics',
            name: 'siteConfigurationAnalytics',
            components: {
              default: SiteConfigurationAnalytics,
              sidebar: SiteConfigurationMenu,
            },
          },
          {
            path: 'page/:pageId',
            name: 'siteConfigurationPage',
            components: {
              default: SiteConfigurationPage,
              sidebar: SiteConfigurationMenu,
            },
          },
        ],
      },
      {
        path: 'profile',
        name: 'accountProfile',
        component: ProfileSettings,
      },
    ],
  },
];

export const routes = [
  pageNotFoundRoutes,
  authRoutes,
  ...frameRoutes,
  ...wizardRoutes,
  ...accountRoutes,
];
