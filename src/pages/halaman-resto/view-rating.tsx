import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Avatar, Box, Card, Grid, Typography, useTheme } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { RatingCommand } from '@models/rating/commands';
import { useStore } from '@models/store';

import Rating from './rating';

import RestoFoto from '@assets/images/RestoFoto.svg';
import LogoBilo from '@assets/images/logoBiloCheckout.svg';

const DUMMY_Rating = [
  {
    id: 1,
    rating: '4',
    userName: 'Pa Hasan',
    tagDetail: [
      'Harga Sesuai',
      'Kemasan Bagus'
    ],
    comment: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
    tanggal: '25 Agustus 2023'
  },
  {
    id: 1,
    rating: '3',
    userName: 'Ozi',
    tagDetail: [
    ],
    comment: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
    tanggal: '17 September 2023'
  },
  {
    id: 1,
    rating: '5',
    userName: 'Wawan',
    tagDetail: [

    ],
    comment: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
    tanggal: '1 November 2023'
  }

];

const UlasandanRating: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.rating);
  const [searchParams] = useSearchParams();
  // const channelId = searchParams.get('id');
  const channelId = 'Q2hhbm5lbDo0';
  

  useEffect(() => {
    if (channelId) {
      dispatch(
        RatingCommand.RatingLoad(channelId)
      )
        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(RatingCommand.RatingClear());
      };
    }
  }, [dispatch, token]);

  return (
    <Box sx={{ margin: '0.5rem 0.5rem' }}>
   {store?.data && store.data.length > 0
     ? store.data.map((obj) => (
      <Card key={obj.id} sx={{ borderColor: 'transparent', marginBottom: '0.5rem', padding: '0.5rem', marginTop: '1rem' }}>
        <Grid container={true} spacing={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>

            <Grid item={true} xs={2}>
                <Avatar src={RestoFoto} sx={{ height: '25px', width: '25px' }} />
            </Grid>

            <Grid item={true} sx={{ justifyContent: 'start', marginLeft: '-20px' }} xs={5}>
                <Typography fontWeight="bold" sx={{ color: 'black' }}>
                    {obj.customerId}
                </Typography>
            </Grid>
            <Grid item={true} sx={{ justifyContent: 'start' }} xs={5}>
                <Box sx={{ marginLeft: '20px' }}>
                    <Rating rating={obj.rating.toString()} />
                </Box>
            </Grid>
        </Grid>
        <Grid container={true} spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '-0.25rem' }}>

            {/* <Grid item={true} sx={{ textAlign: 'start', marginBottom: '0.5rem' }} xs={12}>
                {obj.review.map((item) => {
                  return (

                        <Chip key={item} color="primary" label={item} size="small" sx={{ marginRight: '5px' }} />

                  );
                })}

            </Grid> */}

        </Grid>
        <Grid container={true} spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>

           <Grid item={true} sx={{ textAlign: 'start' }} xs={12}>
               <Typography variant="body2">{obj.review}</Typography>
           </Grid>

        </Grid>
       <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
            <Typography sx={{ fontSize: '0.5rem' }} variant="caption">{obj.createdAt}</Typography>
       </Grid>
      </Card>
     ))
     : (
          <>
            <div
              style={{
                marginTop: '2rem',
                padding: '5rem 5rem 0rem 5rem',
                textAlign: 'center'
              }}
            >
              <img
                alt="Logo"
                src={LogoBilo}
                style={{ height: 'auto', width: '100%' }} />
            </div>
            <Typography
              sx={{ color: theme?.palette?.primary?.main, textAlign: 'center' }}
              variant="h5"
            >
              Sayang sekali saat ini belum ada rating untuk resto kamu...
            </Typography>

          </>
     )}
    </Box>
  );
};

UlasandanRating.displayName = 'UlasandanRating';

export default UlasandanRating;
export { DUMMY_Rating };
