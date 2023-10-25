import type { FC } from 'react';

import type { NavigationGroup, NavigationItem, NavigationSection } from '@nxweb/react';

import type { LayoutProps, NavItemsType } from '@layouts/types.js';

import { NavGroup } from './nav-group.js';
import { NavLink } from './nav-link.js';
import { VerticalNavSection } from './nav-section.js';

interface Props {
  readonly currentActiveGroup: string[]
  readonly groupActive: string[]
  readonly isSubToSub?: NavigationGroup
  readonly navHover?: boolean
  readonly navItems?: LayoutProps['layout']['navMenu']['navItems']
  readonly navVisible?: boolean
  readonly parent?: NavigationGroup
  readonly saveSettings: LayoutProps['saveSettings']
  readonly setCurrentActiveGroup: (item: string[]) => void
  readonly setGroupActive: (value: string[]) => void
  readonly settings: LayoutProps['settings']
}

const resolveNavItemComponent = (item: NavItemsType) => {
  if ((item as NavigationSection).section) return VerticalNavSection;
  if ((item as NavigationGroup).children) return NavGroup;
  if ((item as NavigationItem).content) return null;

  return NavLink;
};

// eslint-disable-next-line react/require-default-props
const NavItems: FC<Props> = (props) => {
  const { navItems } = props;

  const RenderMenuItems = navItems?.map((item: NavItemsType, index: number) => {
    const TagName = resolveNavItemComponent(item);

    return TagName !== null
      // @ts-expect-error dynamic tags
      ? <TagName {...props} item={item} key={index} /> // eslint-disable-line react/no-array-index-key
      : null;
  });

  return <>{RenderMenuItems}</>;
};

NavItems.displayName = 'NavItems';

export { NavItems };
