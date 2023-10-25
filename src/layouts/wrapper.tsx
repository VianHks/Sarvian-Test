import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

import { AuthGuard, GuestGuard, usePageTitle } from '@nxweb/react';
import type { LayoutWrapperProps } from '@nxweb/react';

import { FallbackSpinner as Spinner } from '@components/spinner.js';
import { app } from '@config/app.js';
import { routes } from '@config/routes.js';
import { useSettings } from '@hooks/use-settings.js';
import { ThemeComponent } from '@lib/theme/component.js';

import { UserLayout } from './components/user-layout.js';

interface GuardProps extends PropsWithChildren {
  readonly authGuard: boolean
  readonly guestGuard: boolean
}

const Guard: FC<GuardProps> = ({
  children = undefined, authGuard, guestGuard
}) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  }

  if (!guestGuard && !authGuard) {
    return <>{children}</>;
  }

  return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
};

Guard.displayName = 'Guard';

const LayoutWrapper: FC<LayoutWrapperProps> = ({
  children = null, ...props
}) => {
  const location = useLocation();
  const { settings } = useSettings();
  const [_, setTitle] = usePageTitle({ appName: app.name });

  const authGuard = props.route?.id === '*'
    ? false
    : props.route?.auth !== false;
  const guestGuard = props.route?.guest === true;

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    const [{ route }] = (matchRoutes(routes, location) ?? [{ route: props.route }]).slice(-1);

    route?.title && setTitle(route?.title);

    return () => {
      setTitle('');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ThemeComponent settings={settings}>
      <Guard authGuard={authGuard} guestGuard={guestGuard}>
        <UserLayout {...props}>
          {children}
        </UserLayout>
      </Guard>
    </ThemeComponent>
  );
};

LayoutWrapper.displayName = 'LayoutWrapper';

export { LayoutWrapper };
