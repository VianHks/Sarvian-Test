import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/use-auth';
import { PersonalizedRecomendationCommand } from '@models/personalized-recomendation/reducers';
import { useStore } from '@models/store';

const AuthChecks = () => {
  const navigate = useNavigate();
  const [store, dispatch] = useStore((state) => state);
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);

  useEffect(() => {
    if (token) {
      const tokenKey = {
        token
      };

      dispatch(PersonalizedRecomendationCommand.getCustomerProfile(token, tokenKey));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token && store?.personalizedRec?.customerProfile?.data?.user?.metadata) {
      const { metadata } = store?.personalizedRec?.customerProfile?.data?.user || [];

      if (metadata && metadata.length > 1) {
        navigate(`/beranda`);
      } else {
        navigate(`/personalized-recomendation`);
      }
    }
  }, [token, store?.personalizedRec?.customerProfile?.data, dispatch]);

  /*
   *   UseEffect(() => {
   *     if (store?.detail.status) {
   *       window.sessionStorage.setItem('channelName', store?.detail.nama_brand);
   *       window.sessionStorage.setItem('channelId', store?.detail.channelId);
   *       window.sessionStorage.setItem('channelSlug', store?.detail.channelSlug);
   */

  /*
   *       if (store?.detail.status === 'verification submitted') {
   *         navigate('/beranda');
   *       } else {
   *         navigate('/onboarding');
   *       }
   *     }
   *   }, [navigate, store]);
   */

  return null;
};

AuthChecks.displayName = 'AuthChecks';
AuthChecks.layout = 'blank';

export default AuthChecks;
