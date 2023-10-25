import type { Configuration } from '@nxweb/builder';

export default {
  html: {
    /*
     * TODO: remove when issue is resolved
     *
     * build with sri fails when resource name contains percent encoded character
     * see: https://github.com/waysact/webpack-subresource-integrity/issues/221
     */
    sri: false
  },
  optimization: {
    /*
     * TODO: remove when issue is resolved
     *
     * disable innerGraph optimization due to webpack issue
     * see: https://github.com/webpack/webpack/issues/17740
     */
    innerGraph: false
  },
  // Add builder configuration here
  webFonts: {
    fonts: [{
      family: 'Public Sans',
      variants: ['300', '300italic', '400', '400italic', '500', '500italic', '600', '600italic', '700', '700italic']
    }]
  }
} as Configuration;
