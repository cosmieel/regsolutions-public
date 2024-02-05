import { bAnswers } from './blocks-data/b-answers/b-answers.js';
import { bBanner } from './blocks-data/b-banner/b-banner.js';
import { bBnovo } from './blocks-data/b-bnovo/b-bnovo.js';
import { bCatalog } from './blocks-data/b-catalog/b-catalog.js';
import { bCatalogs } from './blocks-data/b-catalogs/b-catalogs.js';
import { bCover } from './blocks-data/b-cover/b-cover.js';
import { bFeatures } from './blocks-data/b-features/b-features.js';
import { bForm } from './blocks-data/b-form/b-form.js';
import { bGallery } from './blocks-data/b-gallery/b-gallery.js';
import { bHtml } from './blocks-data/b-html/b-html.js';
import { bInfoGroup } from './blocks-data/b-info-group/b-info-group.js';
import { bMap } from './blocks-data/b-map/b-map.js';
import { bPriceList } from './blocks-data/b-price-list/b-price-list.js';
import { bProductHero } from './blocks-data/b-product-hero/b-product-hero.js';
import { bSocials } from './blocks-data/b-socials/b-socials.js';
import { bTags } from './blocks-data/b-tags/b-tags.js';
import { bText } from './blocks-data/b-text/b-text.js';
import { bVideo } from './blocks-data/b-video/b-video.js';

const blocks = [
  bAnswers,
  bBanner,
  bBnovo,
  bCatalog,
  bCatalogs,
  bCover,
  bFeatures,
  bForm,
  bGallery,
  bHtml,
  bInfoGroup,
  bMap,
  bPriceList,
  bProductHero,
  bSocials,
  bTags,
  bText,
  bVideo,
];

export function getDefaultBlockData(type, parameters, catalogsId) {
  const unicParameters = {};

  if (type === 'BCatalogs') {
    unicParameters.catalogsId = catalogsId;
  }

  if (type === 'BCatalog') {
    unicParameters.catalogId = catalogsId[0];
  }

  for (const block of blocks) {
    if (block.type === type) {
      return { ...block, ...parameters, ...unicParameters };
    }
  }
}
