import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Badge, Box, Button, Card, Chip, Grid, TextField, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';


import Rating from './rating';
import RestoFoto from '@assets/images/RestoFoto.svg';


// eslint-disable-next-line import/exports-last
export const DUMMY_Rating = [
  {
    id: 1,
    rating: '4',
    userName: 'Pa Hasan',
    tagDetail:[
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
    tagDetail:[
    ],
    comment: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
    tanggal: '17 September 2023'
  },
  {
    id: 1,
    rating: '5',
    userName: 'Wawan',
    tagDetail:[
        
    ],
    comment: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
    tanggal: '1 November 2023'
  }

  
];

const UlasandanRating: PageComponent = () => {
  const navigate = useNavigate();

  const [methode, setMethode] = useState('Pesan Antar');
  const [filteredResto, setFilteredResto] = useState(DUMMY_Rating);
 


  return (
    <Box sx={{ margin: '1rem 1.5rem' }}>
    {filteredResto.map((obj) => (
      <Card key={obj.id} sx={{ borderColor: 'transparent', marginBottom: '1rem', padding: '0.5rem', marginTop: '2rem' }}>
        <Grid container={true} spacing={4} sx={{ display:'flex', justifyContent:'space-between'}}>
          
            <Grid item={true} xs={2}>
                <Avatar src={RestoFoto} sx={{ height: '25px', width: '25px' }} />
            </Grid>
            
            <Grid item={true} xs={5} sx={{ justifyContent: 'start', marginLeft: '-20px'}}>
                <Typography fontWeight="bold" sx={{ color: 'black' }}>
                    {obj.userName}
                </Typography>
            </Grid>
            <Grid item={true} xs={5} sx={{ justifyContent: 'start' }}>
                <Box sx={{ marginLeft: '20px' }}>
                    <Rating rating={obj.rating} />
                </Box>
            </Grid>
        </Grid>
        <Grid container={true} spacing={2} sx={{ display:'flex', justifyContent:'space-between', marginTop:'-0.25rem'}}>
           
            <Grid item={true} sx={{ textAlign: 'start', marginBottom: '0.5rem' }} xs={12}>
                {obj.tagDetail.map((item) => {
                    return(
                        
                        <Chip color="primary" label={item} size="small" sx={{ marginRight: '5px' }}/>
                  
                    )
                })}
               
            </Grid>
        
        
        </Grid>
        <Grid container={true} spacing={2} sx={{ display:'flex', justifyContent:'space-between', marginBottom: '0.5rem'}}>
           
           <Grid item={true} sx={{ textAlign: 'start' }} xs={12}>
               <Typography variant="body2">{obj.comment}</Typography>
           </Grid>
       
       
       </Grid>
       <Grid sx={{ display:'flex', justifyContent:'end'}}>
            <Typography variant="caption" sx={{ fontSize: '0.5rem' }}>{obj.tanggal}</Typography>
       </Grid>
      </Card>
    ))}
      
  </Box>
  );
};

UlasandanRating.displayName = 'UlasandanRating';

export default UlasandanRating;
