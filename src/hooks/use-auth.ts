import { useMemo } from 'react';

import type { Auth, LoginOptions, LogoutOptions } from '@nxweb/auth';
import { useAuth as useCoreAuth } from '@nxweb/react';

interface AuthState<T extends Auth = Auth> {
  auth: Readonly<T> | undefined
  loggedIn: boolean
  login: (
    options?: Readonly<LoginOptions<unknown>> | undefined,
    addionalParameters?: Readonly<Record<string, unknown>> | undefined
  ) => Promise<void>
  logout: (
    options?: Readonly<LogoutOptions> | undefined,
    addionalParameters?: Readonly<Record<string, unknown>> | undefined
  ) => Promise<void>
}

export const useAuth = () => {
  const coreAuth = useCoreAuth();
  const state: AuthState = useMemo(() => {
    const { authenticated, data } = coreAuth;

    return {
      auth: data,
      loggedIn: authenticated,
      login(
        options?: Readonly<LoginOptions<unknown>> | undefined,
        addionalParameters?: Readonly<Record<string, unknown>> | undefined,
        popup: boolean = false
      ) {
        return popup
          ? coreAuth.loginWithPopup(options, addionalParameters)
          : coreAuth.loginWithRedirect(options, addionalParameters);
      },
      logout(
        options?: Readonly<LogoutOptions> | undefined,
        addionalParameters?: Readonly<Record<string, unknown>> | undefined
      ) {
        return Promise.resolve(coreAuth.logout(options, addionalParameters));
      }
    };
  }, [coreAuth]);

  return state;
};
