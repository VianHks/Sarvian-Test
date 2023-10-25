import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { Chip } from '@components/material.js';
import { useAuth } from '@hooks/use-auth.js';
import { productsCommand } from '@models/products/commands.js';
import { useStore } from '@models/store.js';

const Product: PageComponent = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const [products, dispatch] = useStore((store) => store.products);

  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const product = useMemo(() => products?.output?.find((o) => o.id.toString() === id), [products, id]);

  useEffect(() => {
    if (token) {
      dispatch(productsCommand.load(token))
        .catch((err: unknown) => {
          console.error(err);
        });
    }

    return () => {
      dispatch(productsCommand.clear());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <h1 css={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
        {product?.item_name}
        <Chip label={product?.item_key ?? '...'} />
      </h1>

      <div>{product?.item_description}</div>
      <pre>
        {product ? JSON.stringify(product, null, 2) : null}
      </pre>
    </>
  );
};

Product.displayName = 'Product';

export default Product;
