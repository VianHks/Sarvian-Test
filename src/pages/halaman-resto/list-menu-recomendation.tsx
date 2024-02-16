import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {

  Box,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Typography
} from '@mui/material';

import {

  AddBoxFilled,
  IndeterminateCheckBoxFilled
} from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { ChannelCommand } from '@models/halaman-resto/reducers';
import { OrderCommand } from '@models/order/reducers';
import { useStore } from '@models/store';

interface LinesModel {
  metadata: [
    {
      key: string
      value: string
    }
  ]
  lineId: string
  note: string
  price: string
  quantity: number
  variantId: string
  update: string
  colectionId: string
  productId: string
  thumbnail: string
  name: string
  isAvailableForPurchase: boolean
}

const DefaultLines: LinesModel = {
  metadata: [
    {
      key: 'note',
      value: ''
    }
  ],
  lineId: '',
  note: '',
  price: '',
  quantity: 0,
  variantId: '',
  update: '',
  colectionId: '',
  productId: '',
  thumbnail: '',
  name: '',
  isAvailableForPurchase: false
};

interface PayloadDataModel {
  after: string
  channel: string
  deliveryMethodId: string
  first: number
  lines: LinesModel[]
  userId: string
}

const DATA: PayloadDataModel = {
  after: '',
  channel: '',
  deliveryMethodId: 'string',
  first: 100,
  lines: [DefaultLines],
  userId: 'string'
};

const ListMenuRecomendation: PageComponent = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state);
  const [slug, setSlug] = useState('');

  const navigate = useNavigate();

  const [formData, setFormData] = useState(DATA);

  useEffect(() => {
    if (store?.halamanResto?.channelDetailOutput?.data?.channel.slug) {
      setSlug(store?.halamanResto?.channelDetailOutput?.data?.channel.slug || '');
    }

    if (slug !== '') {
      const paramMetadata = {
        after: '',
        channel: slug,
        filterKey: 'recomendation',
        filterValue: 'true',
        first: 10
      };

      dispatch(
        ChannelCommand.getCollectionsbyMetadata(paramMetadata, token || '')
      );
    }
  }, [dispatch, token, store?.halamanResto?.channelDetailOutput]);

  /*
   * UseEffect(() => {
   *   const collectionIds = (store?.halamanResto?.productListOutput?.data || [])
   *     .filter((category) => category.products.totalCount > 0)
   *     .map((category) => ({
   *       id: category.id.toString(),
   *       name: category.name
   *     }));
   */

  //   setColIds(collectionIds);

  /*
   *   const colIdsOnly = colIds.map((colObj) => colObj.id);
   *   if (colIds.length > 0) {
   *     const paramCollection = {
   *       after: '',
   *       channel: 'makan',
   *       collection: colIdsOnly,
   *       direction: 'ASC',
   *       field: 'NAME',
   *       first: 100
   *     };
   */

  /*
   *     dispatch(
   *       ChannelCommand.getproductbyCollection(paramCollection, token || '')
   *     );
   *   }
   * }, [store?.halamanResto?.productListOutput?.data]);
   */

  useEffect(() => {
    const checkoutIdfromStore = store?.halamanResto?.checkoutListOutput?.data?.checkouts?.edges[0]?.node?.id || '';

    if (checkoutIdfromStore) {
      dispatch(
        OrderCommand.getCheckoutDetails(checkoutIdfromStore, token || '')
      );
    }
  }, [store?.halamanResto?.checkoutListOutput]);

  useEffect(() => {
    if (store?.halamanResto?.productByMetadataOutput) {
      const linesUpdate = store.halamanResto.productByMetadataOutput.data
        .filter((product) => product.metafields.recomendation === 'true')
        .map((product) => {
          const targetId = product.variants[0].id || '';
          const matchingProduct =
            store?.halamanResto?.productByMetadataOutput?.data.find(
              (product) => product.variants[0].id === targetId
            );

          const productIds =
            matchingProduct?.id || '';
          const defaultPrice =
            matchingProduct?.pricing?.priceRange?.start?.net?.amount || 0;

          const defaultName = matchingProduct?.name || '';
          const defaultThumbnail = matchingProduct?.thumbnail.url || '';
          const defaultAvailableforPurchase =
          Boolean(matchingProduct?.metafields?.recomendation === 'true');

          const initialQuantity =
            store?.order?.checkoutDetails?.data?.checkout?.lines &&
            store.order.checkoutDetails.data.checkout &&
            store.order.checkoutDetails.data.checkout.lines &&
            store.order.checkoutDetails.data.checkout.lines.length > 0
              ? store.order.checkoutDetails.data.checkout.lines.find(
                (line) => line.variant.id === targetId
              )?.quantity || 0
              : 0;

          const initialLineId =
            store?.order?.checkoutDetails?.data?.checkout?.lines &&
            store.order.checkoutDetails.data.checkout.lines.length > 0
              ? store.order.checkoutDetails.data.checkout.lines.find(
                (line) => line?.variant?.id === targetId
              )?.id || ''
              : '';
          const initialNote =
            store?.order?.checkoutDetails?.data?.checkout?.lines &&
            store.order.checkoutDetails.data.checkout.lines.length > 0
              ? store.order.checkoutDetails.data.checkout.lines.find(
                (line) => line.variant.id === targetId
              )?.metafields?.note || ''
              : '';

          return {
            ...DefaultLines,
            variantId: targetId,
            price: String(defaultPrice),
            quantity: initialQuantity,
            lineId: initialLineId,
            note: initialNote,
            colectionId: '',
            productId: productIds,
            thumbnail: defaultThumbnail,
            name: defaultName,
            isAvailableForPurchase: defaultAvailableforPurchase === true
          };
        });

      setFormData({ ...formData, lines: linesUpdate });

      dispatch(ChannelCommand.storeLinesMetadata(linesUpdate));
      setIsLoading(false);
    }
  }, [store?.halamanResto?.productByMetadataOutput, store?.order?.checkoutDetails?.data?.checkout]);

  const handleCardClick = (variantId: string, productId: string) => {
    navigate(`/product-view?productId=${productId}&variantId?=${variantId}`);
  };

  console.log('cekformdatarecomend', formData);

  return (
    <>
    {isLoading

      ? <CircularProgress sx={{ display: 'flex', alignItems: 'center', marginLeft: '8.5rem', justifyContent: 'center', height: '100vh' }} />
      : (

        <>
              <Typography
                sx={{
                  fontWeight: 'medium',
                  textAlign: 'start',
                  marginBottom: '0.25rem'
                }}
                variant="h5"
              >
                Menu Rekomendasi
              </Typography>
              {formData.lines.map((obj) => (
                <div key={obj.productId} style={{ marginBottom: '0.5rem' }}>
                <Card sx={{ paddingInline: '0.5rem' }}>
                  <Grid
                    container={true}
                    spacing={2}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <Grid item={true} xs={3}>
                      <div
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          height: '100%',
                          justifyContent: 'center',
                          width: '100%'
                        }}
                      >
                        <img
                          alt={obj.name}
                          src={obj.thumbnail}
                          style={{
                            borderRadius: '8px',
                            maxHeight: '100%',
                            maxWidth: '100%'
                          }} />
                      </div>
                    </Grid>
                    <Grid
                      item={true}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      xs={9}
                    >
                      <Box
                        sx={{
                          marginTop: obj.isAvailableForPurchase
                            ? '2.5rem'
                            : '1rem',
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                        onClick={() => handleCardClick(
                          obj?.variantId,
                          obj?.productId || ''
                        )}
                      >
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            textAlign: 'start',
                            marginTop: '-2rem',
                            color: 'black'
                          }}
                          variant="body2"
                        >
                          {obj.name}
                        </Typography>
                      </Box>
                      {!obj.isAvailableForPurchase && (
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            textAlign: 'start',
                            color: 'red'
                          }}
                          variant="body2"
                        >
                          Persediaan Habis
                        </Typography>
                      )}
                      {obj.isAvailableForPurchase
                        ? (
                        <div>
                          <Grid
                            container={true}
                            justifyContent="space-between"
                            spacing={2}
                            sx={{ marginBottom: '1rem' }}
                          >
                            <Grid item={true} xs={6}>
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  textAlign: 'start',
                                  color: '#1f66d0'
                                }}
                                variant="body2"
                              >
                                Rp. {Number(obj?.price)?.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                              <Typography
                                sx={{
                                  fontWeight: 'medium',
                                  marginLeft: '2.5rem'
                                }}
                                variant="body2"
                              >
                                Terjual 4
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex',
                              justifyContent: 'end',
                              marginTop: '-1rem'
                            }}
                          >
                            <Grid
                              item={true}
                              sx={{
                                display: 'flex',
                                justifyContent: 'end'
                              }}
                              xs="auto"
                            >
                              <IconButton
                                aria-label="min"
                                size="small"
                                sx={{ color: 'black' }}
                                onClick={() => handleCardClick(obj.variantId, obj?.productId || '')}
                              >
                                <IndeterminateCheckBoxFilled size={24} />
                              </IconButton>
                              <Typography
                                key={obj.productId}
                                style={{
                                  display: 'inline-block',
                                  margin: '0 0.5rem',
                                  marginTop: '0.5rem'
                                }}
                                variant="body2"
                              >
                                {obj?.quantity || 0}
                              </Typography>

                              <IconButton
                                aria-label="plus"
                                size="small"
                                sx={{ color: 'black' }}
                                onClick={() => handleCardClick(obj.variantId, obj?.productId || '')}
                              >
                                <AddBoxFilled size={24} />
                              </IconButton>
                            </Grid>
                          </Box>
                        </div>
                        )
                        : null}
                    </Grid>
                  </Grid>
                </Card>
                </div>
              ))}

        </>
      )}
    </>
  );
};

ListMenuRecomendation.displayName = 'ListMenuRecomendation';

export default ListMenuRecomendation;
