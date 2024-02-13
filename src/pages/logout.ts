import { useAuth } from '@hooks/use-auth';

const Logout = () => {
  const redirectURL = process.env.AUTH_LOGOUT_URL || '';

  sessionStorage.clear();
  useAuth().logout({
    redirectURL
  });

  return null;
};

Logout.displayName = 'Logout';
Logout.layout = 'blank';

export default Logout;
