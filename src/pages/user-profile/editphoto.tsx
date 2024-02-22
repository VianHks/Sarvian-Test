import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ArrowBackFilled } from '@nxweb/icons/material';
import { Photo } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { PhotoEditor } from '@components/custom-component/photoeditor';
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useTheme
} from '@components/material.js';
import { useCommand, useStore } from '@models/store';

import iconPhoto from '@assets/images/unggahfoto.svg';

const EditPhoto: PageComponent = () => {
  const command = useCommand((cmd) => cmd);
  const navigate = useNavigate();
  const theme = useTheme();
  const [store, dispatch] = useStore((state) => state.profile);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const location = useLocation();
  const cekState = location.state?.key;

  const photoEditorData = store?.photoeditor;
  const photoEditorIndex = window.sessionStorage.getItem('fileName');

  const photoSrc = store?.photoeditor?.file || Photo;
  const background = `${theme.palette.grey[100]}`;

  const handleCrop = () => {
    setShowPreview(true);
  };

  const handleNavigateBack = () => {
    setShowPreview(false);
    navigate('/profile', { state: { balik: showPreview } });
  };

  const handleBack = () => {
    if (store && store.photoeditor) {
      dispatch(command.profile?.deletePhotoEditorData(store.photoeditor));
    }

    navigate('/profile', { state: { key: cekState } });
  };

  console.log('cekStateUseLoc', cekState);
  console.log('cekShowPreview', showPreview);

  return (
    <AppBar position="static" sx={{ background, elevation: 0, width: '100%', zIndex: '10' }}>
      <Toolbar>
        <Grid
          alignItems="center"
          container={true}
          display="flex"
          justifyContent="space-between"
        >
          <Grid alignItems="center" display="flex" item={true}>
            <IconButton
              aria-label="back"
              color="default"
              edge="start"
              size="large"
              sx={{ mr: 2 }}
              onClick={handleBack}
            >
              <ArrowBackFilled />
            </IconButton>
            <div style={{ display: 'block', alignItems: 'center' }}>
                <Typography fontWeight="bold" sx={{ flexGrow: 1 }} variant="h5">
                  Edit Photo
                </Typography>

            </div>
          </Grid>
        </Grid>
      </Toolbar>

      <div>
        <PhotoEditor
          filePhoto={photoSrc || iconPhoto}
          navigateBack={handleNavigateBack}
          onCrop={handleCrop} />
          {showPreview && croppedImage
            ? <img
                alt="Cropped Image"
                src={photoSrc?.toString() || undefined}
                style={{ width: '100%', height: 'auto' }} />
            : null}
      </div>
    </AppBar>
  );
};

EditPhoto.displayName = 'EditPhoto';
EditPhoto.layout = 'blank';

export default EditPhoto;
