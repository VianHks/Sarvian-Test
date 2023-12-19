/* eslint-disable import/exports-last */
/* eslint-disable complexity */
/* eslint-disable linebreak-style */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Container,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  useTheme
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { Card, Grid, Typography } from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
import { personalizedRecCommand } from '@models/personalized-recomendation/commands';
import { useStore } from '@models/store';

import Bubur from '@assets/images/Bubur.png';
import Chinese from '@assets/images/Chinese.png';
import Dessert from '@assets/images/Dessert.png';
import Jajanan from '@assets/images/Jajanan.png';
import Kopi from '@assets/images/Kopi.png';
import MieBaso from '@assets/images/MieBaso.png';
import Minuman from '@assets/images/Minuman.png';
import Nasi from '@assets/images/Nasi.png';
import Padang from '@assets/images/Padang.png';
import Roti from '@assets/images/Roti.png';
import Sate from '@assets/images/Sate.png';
import Sunda from '@assets/images/Sunda.png';

export interface FoodsDataModel {
  id: string
  photo: string
  title: string
}

export interface FoodsListDataModel {
  [key: string]: FoodsDataModel[]
  breakfast: FoodsDataModel[]
  dinner: FoodsDataModel[]
  lunch: FoodsDataModel[]
}

const STEPS = ['Sarapan', 'Makan Siang', 'Makan Malam'];

const DUMMY_FOODS: FoodsDataModel[] = [
  {
    id: '0',
    photo: `${Minuman}`,
    title: 'Minuman'
  },
  {
    id: '1',
    photo: `${Nasi}`,
    title: 'Aneka Nasi'
  },
  {
    id: '2',
    photo: `${Roti}`,
    title: 'Roti'
  },
  {
    id: '3',
    photo: `${Jajanan}`,
    title: 'Jajanan'
  },
  {
    id: '4',
    photo: `${Kopi}`,
    title: 'Kopi'
  },
  {
    id: '5',
    photo: `${MieBaso}`,
    title: 'Mie & Bakso'
  },
  {
    id: '6',
    photo: `${Dessert}`,
    title: 'Desert'
  },
  {
    id: '7',
    photo: `${Sunda}`,
    title: 'Sunda'
  },
  {
    id: '8',
    photo: `${Chinese}`,
    title: 'Chinese'
  },
  {
    id: '9',
    photo: `${Padang}`,
    title: 'Padang'
  },
  {
    id: '10',
    photo: `${Sate}`,
    title: 'Sate'
  },
  {
    id: '11',
    photo: `${Bubur}`,
    title: 'Bubur'
  }
];

export const DEFAULT_FOODS_LIST: FoodsListDataModel = {
  breakfast: [],
  dinner: [],
  lunch: []
};

const PersonalizedRecomendation: PageComponent = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.personalizedRec);
  const navigate = useNavigate();
  const [foodsList, setFoodsList] =
    useState<FoodsListDataModel>(DEFAULT_FOODS_LIST);
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  /*
   * Const handleFoodItemClick = (clickedItem: FoodsDataModel, mealType: string) => {
   *   setFoodsList((prevFoodsList) => {
   *     switch (mealType) {
   *       case 'breakfast':
   *         return {
   *           ...prevFoodsList,
   *           breakfast: [...prevFoodsList.breakfast, clickedItem]
   *         };
   *       case 'lunch':
   *         return {
   *           ...prevFoodsList,
   *           lunch: [...prevFoodsList.lunch, clickedItem]
   *         };
   *       case 'dinner':
   *         return {
   *           ...prevFoodsList,
   *           dinner: [...prevFoodsList.dinner, clickedItem]
   *         };
   */

  /*
   *       default:
   *         return prevFoodsList;
   *     }
   *   });
   * };
   */

  const handleFoodItemClick = (clickedItem: FoodsDataModel, mealType: string) => {
    setFoodsList((prevFoodsList) => {
      const updatedFoodsList = { ...prevFoodsList };
      const selectedItems = updatedFoodsList[mealType];

      const isItemAlreadySelected = selectedItems.some((item) => item.id === clickedItem.id);

      if (isItemAlreadySelected) {
        // If item is already selected, remove it from the list
        updatedFoodsList[mealType] = selectedItems.filter((item) => item.id !== clickedItem.id);
      } else {
        const selectedItem = store?.personalizedRecOutput?.find(
          (item) => item.id === clickedItem.id
        );

        if (selectedItem) {
          // If item is not selected, add it to the list
          updatedFoodsList[mealType] = [...selectedItems, selectedItem];
        }
      }

      console.log('Updated foods list:', updatedFoodsList);

      return updatedFoodsList;
    });
  };

  useEffect(() => {
    if (token) {
      dispatch(personalizedRecCommand.personalizedRecLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(personalizedRecCommand.personalizedRecClear());
      };
    }
  }, []);

  /*
   * UseEffect(() => {
   *   if (token) {
   *     setFoodsList(store?.personalizedRecOutput || );
   *   }
   */

  // }, []);

  console.log('cekstore', store);

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      setActiveStep(2);
    } else {
      navigate('/beranda');
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setActiveStep(0);
    } else if (activeStep === 2) {
      setActiveStep(1);
    }
  };

  return (
    <Container style={{ padding: '3rem 1.5rem' }}>
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}
        variant="h5"
      >
        {activeStep === 0
          ? 'Mau sarapan apa TokruMates?'
          : activeStep === 1
            ? 'Udah makan siang belum?'
            : 'Jangan lupa makan malam ya!'}
      </Typography>
      <Typography
        sx={{ marginBottom: '1rem', textAlign: 'center' }}
        variant="body2"
      >
        Pilih makanan kesukaanmu! (minimal 3 kategori)
      </Typography>
      <Box sx={{ marginBottom: '1rem' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel={true}
          nonLinear={true}
        >
          {STEPS.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={() => setActiveStep(index)}>
                <StepLabel style={{ color: 'blue' }}>
                  {label}
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === 0
        ? (
          <Box>
            <Grid container={true} spacing={2}>
              {store?.personalizedRecOutput?.map((obj) => {
                const isItemSelected = foodsList.breakfast.some(
                  (item) => Number(item.id) === Number(obj.id)
                );

                return (
                  <Grid
                    item={true}
                    key={obj.id}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    xs={4}
                  >
                    <Card
                      sx={{
                        alignItems: 'center',
                        borderRadius: '8px',
                        display: 'block',
                        justifyContent: 'center',
                        marginBottom: '0.2rem',
                        padding: '0.5rem 1rem',
                        cursor: isItemSelected ? 'not-allowed' : 'pointer',
                        opacity: isItemSelected ? 0.7 : 1,
                        boxShadow: isItemSelected
                          ? '0px 0px 10px rgba(0, 0, 0, 0.3)'
                          : 'none',
                        border: isItemSelected
                          ? '2px solid #3f51b5'
                          : '2px solid transparent'
                      }}
                      onClick={() => handleFoodItemClick(obj, 'breakfast')}
                    >
                      <Avatar
                        src={obj.photo}
                        sx={{
                          height: '66px',
                          marginBottom: '0.5rem',
                          width: '66px'
                        }} />
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '10px',
                          lineHeight: '15px'
                        }}
                      >
                        {obj.title}
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )
        : activeStep === 1
          ? (
            <Box>
              <Grid container={true} spacing={2}>
                {store?.personalizedRecOutput?.map((obj) => {
                  const isItemSelected = foodsList.breakfast.some(
                    (item) => Number(item.id) === Number(obj.id)
                  );

                  return (
                    <Grid
                      item={true}
                      key={obj.id}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                      xs={4}
                    >
                      <Card
                        sx={{
                          alignItems: 'center',
                          borderRadius: '8px',
                          display: 'block',
                          justifyContent: 'center',
                          marginBottom: '0.2rem',
                          padding: '0.5rem 1rem',
                          cursor: isItemSelected ? 'not-allowed' : 'pointer',
                          opacity: isItemSelected ? 0.7 : 1,
                          boxShadow: isItemSelected
                            ? '0px 0px 10px rgba(0, 0, 0, 0.3)'
                            : 'none',
                          border: isItemSelected
                            ? '2px solid #3f51b5'
                            : '2px solid transparent'
                        }}
                        onClick={() => handleFoodItemClick(obj, 'breakfast')}
                      >
                        <Avatar
                          src={obj.photo}
                          sx={{
                            height: '66px',
                            marginBottom: '0.5rem',
                            width: '66px'
                          }} />
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: '10px',
                            lineHeight: '15px'
                          }}
                        >
                          {obj.title}
                        </Typography>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )
          : (
            <Box>
              <Grid container={true} spacing={2}>
                {store?.personalizedRecOutput?.map((obj) => {
                  const isItemSelected = foodsList.breakfast.some(
                    (item) => Number(item.id) === Number(obj.id)
                  );

                  return (
                    <Grid
                      item={true}
                      key={obj.id}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                      xs={4}
                    >
                      <Card
                        sx={{
                          alignItems: 'center',
                          borderRadius: '8px',
                          display: 'block',
                          justifyContent: 'center',
                          marginBottom: '0.2rem',
                          padding: '0.5rem 1rem',
                          cursor: isItemSelected ? 'not-allowed' : 'pointer',
                          opacity: isItemSelected ? 0.7 : 1,
                          boxShadow: isItemSelected
                            ? '0px 0px 10px rgba(0, 0, 0, 0.3)'
                            : 'none',
                          border: isItemSelected
                            ? '2px solid #3f51b5'
                            : '2px solid transparent'
                        }}
                        onClick={() => handleFoodItemClick(obj, 'breakfast')}
                      >
                        <Avatar
                          src={obj.photo}
                          sx={{
                            height: '66px',
                            marginBottom: '0.5rem',
                            width: '66px'
                          }} />
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: '10px',
                            lineHeight: '15px'
                          }}
                        >
                          {obj.title}
                        </Typography>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '1.5rem'
        }}
      >
        <Button
          color="primary"
          sx={{ display: activeStep === 0 ? 'none' : 'block', width: '50%', padding: '0.7rem' }}
          variant="outlined"
          onClick={() => handleBack()}
        >
          Kembali
        </Button>
        <Button
          color="primary"
          disabled={
            activeStep === 0
              ? foodsList.breakfast.length < 3
              : activeStep === 1
                ? foodsList.lunch.length < 3
                : foodsList.dinner.length < 3
          }
          fullWidth={activeStep === 0}
          sx={{ padding: '0.7rem', width: activeStep > 0 ? '50%' : '100%' }}
          variant="contained"
          onClick={() => handleNext()}
        >
          Lanjut
        </Button>
      </Box>
    </Container>
  );
};

PersonalizedRecomendation.displayName = 'PersonalizedRecomendation';
export default PersonalizedRecomendation;
