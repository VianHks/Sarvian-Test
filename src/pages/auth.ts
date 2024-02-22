import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/use-auth';
import { PersonalizedRecomendationCommand } from '@models/personalized-recomendation/reducers';

const AuthChecks = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);

  useEffect(() => {
    if (token) {
      PersonalizedRecomendationCommand.isEmailRegistered(token || '').then((resp) => {
        if (resp) {
          navigate('/beranda');
        } else {
          navigate('/registration_info');
        }
      });
    }
  }, [token]);

  return null;
};

AuthChecks.displayName = 'AuthChecks';
AuthChecks.layout = 'blank';

export default AuthChecks;
