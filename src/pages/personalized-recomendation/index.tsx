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
import { PersonalizedRecomendationCommand } from '@models/personalized-recomendation/reducers';
import { useStore } from '@models/store';

import { ColorlibConnector, ColorlibStepIcon } from './stepper';

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
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);

  const [store, dispatch] = useStore((state) => state?.personalizedRec);
  const [foodsList, setFoodsList] =
    useState<FoodsListDataModel>(DEFAULT_FOODS_LIST);
  const userId = 'VXNlcjoyMDUwMjQwNjE5';

  const [activeStep, setActiveStep] = useState(0);

  const getFoodsList = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return foodsList.breakfast;
      case 'lunch':
        return foodsList.lunch;
      case 'dinner':
        return foodsList.dinner;

      default:
        return [];
    }
  };

  const isButtonDisabled = () => {
    if (activeStep === 0) {
      return foodsList.breakfast.length < 3;
    }

    if (activeStep === 1) {
      return foodsList.lunch.length < 3;
    }

    return foodsList.dinner.length < 3;
  };

  const handleFoodItemClick = (
    clickedItem: FoodsDataModel,
    mealType: string
  ) => {
    setFoodsList((prevFoodsList) => {
      const updatedFoodsList = { ...prevFoodsList };
      const selectedItems = updatedFoodsList[mealType];

      const isItemAlreadySelected = selectedItems.some(
        (item) => item.id === clickedItem.id
      );

      if (isItemAlreadySelected) {
        updatedFoodsList[mealType] = selectedItems.filter(
          (item) => item.id !== clickedItem.id
        );
      } else {
        const selectedItem = store?.recomendationList?.find(
          (item: FoodsDataModel) => item.id === clickedItem.id
        );

        if (selectedItem) {
          updatedFoodsList[mealType] = [...selectedItems, selectedItem];
        }
      }

      return updatedFoodsList;
    });
  };

  useEffect(() => {
    dispatch(PersonalizedRecomendationCommand.getPersonalizeRecomendation());
  }, [dispatch]);

  useEffect(() => {
    if (token && store?.customerProfile?.data?.user?.metadata) {
      const { metadata } = store.customerProfile.data.user;
      if (metadata && metadata.length > 0) {
        navigate(`/beranda?id=${userId}`);
      } else {
        dispatch(PersonalizedRecomendationCommand.getPersonalizeRecomendation());
        dispatch(PersonalizedRecomendationCommand.getMenuRecomendation(token));
      }
    }
  }, [token, store?.customerProfile?.data, dispatch]);

  const handleNext = () => {
    const payload = {
      id: userId,
      metadataInput: [
        { key: 'breakfast', value: JSON.stringify(foodsList.breakfast) },
        { key: 'lunch', value: JSON.stringify(foodsList.lunch) },
        { key: 'dinner', value: JSON.stringify(foodsList.dinner) }
      ]
    };
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      setActiveStep(2);
    } else {
      PersonalizedRecomendationCommand.postPersonalizeRecomendation(
        payload,
        token || ''
      );
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

  console.log('cekstore', store);

  const renderCard = (mealType: string) => {
    const selectedFoodsList = getFoodsList(mealType);

    return (
      <Box>
        <Grid container={true} spacing={2}>
          {store?.recomendationList?.map((obj: FoodsDataModel) => {
            const isItemSelected = selectedFoodsList.some(
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
                    backgroundColor: isItemSelected ? '#D5ECFE' : 'initial',
                    border: isItemSelected
                      ? '2px solid #8FBCFF'
                      : '2px solid transparent',
                    borderRadius: '8px',
                    boxShadow: isItemSelected
                      ? '0px 0px 5px rgba(0, 0, 0, 0.3)'
                      : '0px 0px 5px rgba(16, 24, 40, 0.1)',
                    cursor: isItemSelected ? 'not-allowed' : 'pointer',
                    display: 'block',
                    justifyContent: 'center',
                    marginBottom: '0.1rem',
                    opacity: 1,
                    padding: '1rem'
                  }}
                  onClick={() => handleFoodItemClick(obj, mealType)}
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
    );
  };

  return (
    <Container style={{ padding: '3rem 1.5rem' }}>
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'left' }}
        variant="h4"
      >
        {activeStep === 0
          ? 'Mau sarapan apa TokruMates?'
          : activeStep === 1
            ? 'Udah makan siang belum?'
            : 'Jangan lupa makan malam ya!'}
      </Typography>
      <Typography
        sx={{ marginBottom: '1rem', textAlign: 'left' }}
        variant="body2"
      >
        Pilih makanan kesukaanmu! (minimal 3 kategori)
      </Typography>
      <Box sx={{ marginBottom: '1rem' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel={true}
          connector={<ColorlibConnector />}
          nonLinear={true}
        >
          {STEPS.map((label, index) => (
            <Step
              active={index === activeStep}
              completed={index < activeStep}
              key={label}
            >
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Typography
                  sx={{
                    color:
                      index === activeStep
                        ? theme.palette.primary.main
                        : index < activeStep
                          ? theme.palette.primary.main
                          : theme.palette.grey[600]
                    // FontFamily: theme.typography.fontFamily?.split(',')[1].trim()
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
      {activeStep === 0 && renderCard('breakfast')}
      {activeStep === 1 && renderCard('lunch')}
      {activeStep === 2 && renderCard('dinner')}
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
          sx={{
            display: activeStep === 0 ? 'none' : 'block',
            padding: '0.6rem',
            width: '50%'
          }}
          variant="outlined"
          onClick={() => handleBack()}
        >
          Kembali
        </Button>
        <Button
          disabled={isButtonDisabled()}
          fullWidth={activeStep === 0}
          sx={{
            background: isButtonDisabled()
              ? theme.palette.grey[500]
              : theme.palette.primary.gradient,
            padding: '0.6rem',
            width: activeStep > 0 ? '50%' : '100%'
          }}
          variant="outlined"
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
