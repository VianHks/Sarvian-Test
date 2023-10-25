import type { FC, ReactNode } from 'react';

import { styled, useScrollTrigger, Zoom } from '@components/material.js';

interface ScrollToTopProps {
  readonly children: ReactNode
  readonly className?: string
}

const ScrollToTopStyled = styled('div')(({ theme }) => ({
  bottom: theme.spacing(10),
  position: 'fixed',
  right: theme.spacing(6),
  zIndex: 11
}));

const ScrollToTop: FC<ScrollToTopProps> = ({ children, className = undefined }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 400
  });

  const handleClick = () => {
    const anchor = document.querySelector('body');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Zoom in={trigger}>
      {/* eslint-disable-next-line jsx-a11y/prefer-tag-over-role */}
      <ScrollToTopStyled className={className} role="presentation" onClick={handleClick}>
        {children}
      </ScrollToTopStyled>
    </Zoom>
  );
};

ScrollToTop.displayName = 'ScrollToTop';

export { ScrollToTop };
