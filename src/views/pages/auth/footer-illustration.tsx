import type { FC, ReactNode } from 'react';

import { styled, useMediaQuery, useTheme } from '@components/material.js';

import maskImage from '@assets/images/pages/auth-v2-mask-light.png';

interface FooterIllustrationsProp {
  readonly className?: string
  readonly height?: number
  readonly image?: ReactNode
}

const MaskImg = styled('img')(({ theme }) => ({
  bottom: 0,
  height: 300,
  position: 'absolute',
  width: '100%',
  [theme.breakpoints.down(1540)]: {
    height: 250
  }
}));

const FooterIllustrations: FC<FooterIllustrationsProp> = ({
  className = undefined,
  height = undefined,
  image = undefined
}) => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  if (!hidden) {
    return (
      <>
        {!image
          ? (
          <MaskImg
            alt="mask"
            className={className}
            {...(height && { height })}
            src={maskImage} />
          )
          : typeof image === 'string'
            ? <MaskImg alt="mask" className={className} src={image} {...(height && { height })} />
            : image}
      </>
    );
  }

  return null;
};

FooterIllustrations.displayName = 'FooterIllustrations';

export { FooterIllustrations };
