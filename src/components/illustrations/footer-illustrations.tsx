import type { FC, ReactNode } from 'react';

import { styled, useMediaQuery, useTheme } from '@components/material.js';

import maskImage from '@assets/images/pages/misc-mask-light.png';

interface FooterIllustrationsProps {
  readonly image?: ReactNode
}

// Styled Components
const MaskImg = styled('img')(() => ({
  bottom: 0,
  height: 260,
  position: 'absolute',
  width: '100%',
  zIndex: -1
}));

const FooterIllustrations: FC<FooterIllustrationsProps> = ({
  image = undefined
}) => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  if (!hidden) {
    return (
      <>
        {!image
          ? <MaskImg alt="mask" src={maskImage} />
          : typeof image === 'string'
            ? <MaskImg alt="mask" src={image} />
            : image}
      </>
    );
  }

  return null;
};

FooterIllustrations.displayName = 'FooterIllustrations';

export { FooterIllustrations };
export type { FooterIllustrationsProps };
