import type { Location } from 'react-router-dom';

import type { NavigationGroup, NavigationItem, NavigationLink } from '@nxweb/react';

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param router - The router
 * @param path - The path
 */
export const handleURLQueries = (location: Location, path: string | undefined): boolean => {
  const params = new URLSearchParams(location.search);
  if (params.size > 0 && path) {
    const routerPath = location.pathname;
    const arr = [...params.keys()];

    return routerPath.includes(path) && routerPath.includes(params.get(arr[0]) as string) && path !== '/';
  }

  return false;
};

/**
 * Check if the given item has the given url
 * in one of its children
 *
 * @param item - The NavGroup
 * @param currentURL - The current URL
 */
export const hasActiveChild = (item: NavigationGroup, currentURL: string): boolean => {
  const { children } = item;

  if (!children) {
    return false;
  }

  for (const child of children) {
    if ('children' in child && child.children) {
      if (hasActiveChild(child, currentURL)) {
        return true;
      }
    }

    const childPath = (child as NavigationLink).link;

    // Check if the child has a link and is active
    if (
      child &&
      childPath &&
      currentURL &&
      (childPath === currentURL || (currentURL.includes(childPath) && childPath !== '/'))
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Check if this is a children
 * of the given item
 *
 * @param children - The children
 * @param openGroup - The open groups
 * @param currentActiveGroup - The current active group
 */
export const removeChildren = (children: readonly (NavigationGroup | NavigationItem | NavigationLink)[], openGroup: string[], currentActiveGroup: string[]) => {
  children.forEach((child) => {
    if ('id' in child && !currentActiveGroup.includes(child.id)) {
      const index = openGroup.indexOf(child.id);
      if (index > -1) openGroup.splice(index, 1);

      // @ts-expect-error children may not exist
      if (child.children) removeChildren(child.children, openGroup, currentActiveGroup);
    }
  });
};
