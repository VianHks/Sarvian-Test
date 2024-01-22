import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  useTheme
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { Card, Grid, Typography } from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
import { personalizedRecCommand } from '@models/personalized-recomendation/commands';
import { useStore } from '@models/store';

interface FoodsDataModel {
  id: string
  photo: string
  title: string
}

interface FoodsListDataModel {
  [key: string]: FoodsDataModel[]
  breakfast: FoodsDataModel[]
  dinner: FoodsDataModel[]
  lunch: FoodsDataModel[]
}

const STEPS = ['Sarapan', 'Makan Siang', 'Makan Malam'];

const DEFAULT_FOODS_LIST: FoodsListDataModel = {
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
        updatedFoodsList[mealType] = selectedItems.filter((item) => item.id !== clickedItem.id);
      } else {
        const selectedItem = store?.personalizedRecOutput?.find(
          (item) => item.id === clickedItem.id
        );

        if (selectedItem) {
          updatedFoodsList[mealType] = [...selectedItems, selectedItem];
        }
      }

      // Console.log('Updated foods list:', updatedFoodsList);

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

  // console.log('cekstore', store);

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      setActiveStep(2);
    } else {
      setTimeout(() => {
        navigate('/location-by-gps');
      });
      setTimeout(() => {
        navigate('/beranda');
      }, 4000);
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
        variant="h4"
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
          // Connector={<StepConnector style={{ backgroundColor: theme.palette.secondary.main }} />} // Ganti warna garis antara langkah-langkah
          nonLinear={true}
        >
          {STEPS.map((label, index) => (
            <Step active={index === activeStep} completed={index < activeStep} key={label}>
              <StepLabel>
                <Typography
                  sx={{
                    color: index === activeStep ? theme.palette.primary.main : index < activeStep ? theme.palette.primary.main : theme.palette.grey[600],
                    fontFamily: theme.typography.fontFamily?.split(',')[1].trim()
                  }}
                  variant="body1"
                >
                  {label}
                </Typography>
              </StepLabel>
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
                        border: isItemSelected
                          ? '2px solid #3f51b5'
                          : '2px solid transparent',
                        borderRadius: '8px',
                        boxShadow: isItemSelected
                          ? '0px 0px 15px rgba(0, 0, 0, 0.3)'
                          : '0px 0px 5px rgba(0, 0, 0, 0.3)',
                        cursor: isItemSelected ? 'not-allowed' : 'pointer',
                        display: 'block',
                        justifyContent: 'center',
                        marginBottom: '0.625rem',
                        opacity: isItemSelected ? 0.7 : 1,
                        padding: '0.5rem 1rem'
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
                          fontSize: '10px',
                          fontWeight: 'bold',
                          lineHeight: '15px',
                          textAlign: 'center'
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
                  const isItemSelected = foodsList.lunch.some(
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
                          border: isItemSelected
                            ? '2px solid #3f51b5'
                            : '2px solid transparent',
                          borderRadius: '8px',
                          boxShadow: isItemSelected
                            ? '0px 0px 15px rgba(0, 0, 0, 0.3)'
                            : '0px 0px 5px rgba(0, 0, 0, 0.3)',
                          cursor: isItemSelected ? 'not-allowed' : 'pointer',
                          display: 'block',
                          justifyContent: 'center',
                          marginBottom: '0.625rem',
                          opacity: isItemSelected ? 0.7 : 1,
                          padding: '0.5rem 1rem'
                        }}
                        onClick={() => handleFoodItemClick(obj, 'lunch')}
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
                            fontSize: '10px',
                            fontWeight: 'bold',
                            lineHeight: '15px',
                            textAlign: 'center'
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
                  const isItemSelected = foodsList.dinner.some(
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
                          border: isItemSelected
                            ? '2px solid #3f51b5'
                            : '2px solid transparent',
                          borderRadius: '8px',
                          boxShadow: isItemSelected
                            ? '0px 0px 15px rgba(0, 0, 0, 0.3)'
                            : '0px 0px 5px rgba(0, 0, 0, 0.3)',
                          cursor: isItemSelected ? 'not-allowed' : 'pointer',
                          display: 'block',
                          justifyContent: 'center',
                          marginBottom: '0.625rem',
                          opacity: isItemSelected ? 0.7 : 1,
                          padding: '0.5rem 1rem'
                        }}
                        onClick={() => handleFoodItemClick(obj, 'dinner')}
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
                            fontSize: '10px',
                            fontWeight: 'bold',
                            lineHeight: '15px',
                            textAlign: 'center'
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
          sx={{ display: activeStep === 0 ? 'none' : 'block', width: '50%' }}
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
          sx={{ width: activeStep > 0 ? '50%' : '100%' }}
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
PersonalizedRecomendation.layout = 'blank';
export default PersonalizedRecomendation;
export { DEFAULT_FOODS_LIST };
export type { FoodsDataModel, FoodsListDataModel };
