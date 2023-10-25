import type { FC } from 'react';

import { Separator } from '@nxweb/icons/tabler';
import type { NavigationSection } from '@nxweb/react';

import { ListSubheader as MuiListSubheader, styled, Typography } from '@components/material.js';
import type { ListSubheaderProps } from '@components/material.js';
import type { Settings } from '@hooks/use-settings.js';
import { Translation } from '@layouts/components/translation.js';

interface Props {
  readonly collapsedNavWidth: number
  readonly item: NavigationSection
  readonly navHover: boolean
  readonly navigationBorderWidth: number
  readonly settings: Settings
}

// ** Styled Components
const ListSubheader = styled((props: ListSubheaderProps) => <MuiListSubheader component="li" {...props} />)(
  ({ theme }) => ({
    backgroundColor: 'transparent',
    display: 'flex',
    lineHeight: 1,
    marginTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    position: 'static',
    transition: 'padding-left .25s ease-in-out'
  })
);

const VerticalNavSection: FC<Props> = ({
  item, navHover, settings, collapsedNavWidth, navigationBorderWidth
}) => {
  const { navCollapsed } = settings;

  return (
    <ListSubheader
      className="nav-section-title"
      sx={{
        ...navCollapsed && !navHover
          ? { px: (collapsedNavWidth - navigationBorderWidth - 22) / 8, py: 0.5 }
          : { px: 7.5 },
        '& .MuiTypography-root, & svg': {
          color: 'text.disabled'
        }
      }}
      title={item.title}
    >
      {navCollapsed && !navHover
        ? <Separator />

        : (
        <Typography noWrap={true} sx={{ textTransform: 'uppercase' }} variant="caption">
          { typeof item.section === 'string'
            ? <Translation text={item.section} />
            : item.section }
        </Typography>
        )}
    </ListSubheader>
  );
};

VerticalNavSection.displayName = 'VerticalNavSection';

export { VerticalNavSection };
