import type { FC } from 'react';

import { Box } from '@components/material.js';
import type { LayoutProps } from '@layouts/types.js';

import { FooterContent } from './footer/content.js';

interface Props {
  readonly footerContent?: NonNullable<LayoutProps['footerProps']>['content']
  readonly footerStyles?: NonNullable<LayoutProps['footerProps']>['sx']
  // eslint-disable-next-line react/no-unused-prop-types
  readonly saveSettings: LayoutProps['saveSettings']
  readonly settings: LayoutProps['settings']
}

// eslint-disable-next-line react/require-default-props
const Footer: FC<Props> = (props) => {
  const { settings, footerStyles, footerContent: userFooterContent } = props;

  // ** Vars
  const { footer } = settings;

  if (footer === 'hidden') {
    return null;
  }

  return (
    <Box
      className="layout-footer"
      component="footer"
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
        ...footer === 'fixed' && {
          bottom: 0,
          position: 'sticky',
          px: [4, 6]
        },
        ...footerStyles
      }}
    >
      <Box
        className="footer-content-container"
        sx={{
          borderTopLeftRadius: (theme) => theme.shape.borderRadius,
          borderTopRightRadius: (theme) => theme.shape.borderRadius,
          px: 6,
          py: (theme) => theme.spacing(footer === 'fixed' ? 2.875 : 3),
          ...footer === 'fixed' && { backgroundColor: (theme) => theme.palette.background.paper, boxShadow: 16 },
          width: '100%'
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
    </Box>
  );
};

Footer.displayName = 'Footer';

export { Footer };
