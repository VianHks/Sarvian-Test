import { useState } from 'react';

import { Box, Button, Chip, Divider, Grid, Rating, TextField, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import menu from '@assets/images/pages/menuO.svg';
import resto from '@assets/images/pages/restoO.svg';

const RatingAfterOrder: PageComponent = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isTextFieldFocused, setTextFieldFocus] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChipClick = (chip: string) => {
    if (selectedChips.includes(chip)) {
      // Deactivate the chip and remove its value from the TextField
      setSelectedChips((prevChips) => prevChips.filter((selectedChip) => selectedChip !== chip));
      setTextFieldValue((prevValue) => prevValue
        .split(', ')
        .filter((selectedChip) => selectedChip !== chip)
        .join(', '));
    } else {
      // Activate the chip and add its value to the TextField
      setSelectedChips((prevChips) => [...prevChips, chip]);
      setTextFieldValue((prevValue) => prevValue + (prevValue ? ', ' : '') + chip);
    }
  };

  const isButtonDisabled = rating === 0;

  return (
    <Box margin="1rem 1.5rem">
      <Box alignItems="center" display="flex" flexDirection="column">
        <Typography color="primary" fontWeight="bold" marginBlock="1rem 1.5rem" variant="h4">
          Ulasan Restoran
        </Typography>
        <img alt="resto" src={resto} />
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue);
          }} />
        <Typography color="neutral-90" fontWeight="bold" variant="h5">
          Ulasan Restoran
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', marginBlock: '1rem' }}>
        {['Harga Sesuai', 'Kemasan Bagus', 'Ramah', 'Rasa Enak', 'Higienis'].map((chipLabel) => (
          <Chip
            color={selectedChips.includes(chipLabel) ? 'primary' : 'default'}
            key={chipLabel}
            label={chipLabel}
            onClick={() => handleChipClick(chipLabel)} />
        ))}
      </Box>
      <Grid container={true}>
        <Grid item={true} marginRight="1rem" xs="auto">
          <img alt="menu" src={menu} />
        </Grid>
        <Grid item={true} xs={true}>
          <Typography color="neutral-90" fontWeight="bold" variant="body2">
            Paket Ayam Bakar
          </Typography>
          <Typography color="neutral-90" variant="body2">
            Rp 25.000
          </Typography>
        </Grid>
        <Grid item={true} xs="auto">
          <Typography color="neutral-90" fontWeight="bold" variant="caption">
            2 Item
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBlock: '1rem' }} />
      <Grid container={true}>
        <Grid item={true} marginRight="1rem" xs="auto">
          <img alt="menu" src={menu} />
        </Grid>
        <Grid item={true} xs={true}>
          <Typography color="neutral-90" fontWeight="bold" variant="body2">
            Paket Ayam Bakar
          </Typography>
          <Typography color="neutral-90" variant="body2">
            Rp 25.000
          </Typography>
        </Grid>
        <Grid item={true} xs="auto">
          <Typography color="neutral-90" fontWeight="bold" variant="caption">
            2 Item
          </Typography>
        </Grid>
      </Grid>
      <TextField
        fullWidth={true}
        multiline={true}
        placeholder="Ada masukkan buat resto?"
        rows={4}
        size="small"
        sx={{ marginBlock: '1rem' }}
        value={textFieldValue}
        variant="outlined"
        onBlur={() => setTextFieldFocus(false)}
        onChange={(e) => setTextFieldValue(e.target.value)}
        onFocus={() => setTextFieldFocus(true)} />
      <Button disabled={isButtonDisabled} fullWidth={true} size="small" sx={{ marginBottom: '0.5rem' }} variant="outlined">
        <Typography color={isButtonDisabled ? 'neutral-70' : 'primary'} fontWeight="bold" variant="body1">
          Kirim
        </Typography>
      </Button>
      <Button fullWidth={true} size="small" variant="outlined">
        <Typography color="primary" fontWeight="bold" variant="body1">
          Lewati
        </Typography>
      </Button>
    </Box>
  );
};

RatingAfterOrder.displayName = 'RatingAfterOrder';

export default RatingAfterOrder;
