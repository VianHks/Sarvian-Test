import type { FC } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

import type { RouteProps } from '@nxweb/react';

import { Button } from '@components/material.js';

const RouteError: FC<RouteProps> = () => {
  const error = useRouteError() as Error & { code?: string };
  const navigate = useNavigate();

  return (
    <div className="error">
      <div className="error-container">
        <h1 className="error-message">
          <span>ERROR</span>
          {error.code ? <small className="error-code critical">{error.code}</small> : null }
        </h1>

        { error.stack
          ? <p className="error-details">
              {error.stack}
            </p>
          : null}
        { window.location.pathname !== '/'
          ? <p className="error-details text-center mt-3">
              <Button onClick={() => navigate('/')}>Return Home</Button>
            </p>
          : null}
      </div>
    </div>
  );
};

RouteError.displayName = 'RouteError';

export default RouteError;
