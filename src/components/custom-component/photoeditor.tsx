import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { CropperRef } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Grid } from '@mui/material';
import imageCompression from 'browser-image-compression';

import { TwitterCropper } from '@components/twittercropper/TwitterCropper';
import { useCommand, useStore } from '@models/store';
import { toBase64 } from '@pages/user-profile/validatesize';

interface PhotoEditorModel {
  file: File | null
  fileName: string
  size: number
  typeFile: string
  base64Image: string
}

const DEFAULT_PHOTOEDITOR: PhotoEditorModel = {
  file: null,
  fileName: '',
  size: 0,
  typeFile: '',
  base64Image: ''
};

interface PhotoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly filePhoto: File | React.ComponentType<any> | string
  readonly onCrop: (croppedImageData: string) => void
  readonly children?: ReactNode
  readonly navigateBack: () => void
}

const cropperContainerStyle = {
  position: 'sticky',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1
};

const PhotoEditor: FC<PhotoProps> = ({
  filePhoto,
  onCrop,
  children,
  navigateBack
}) => {
  const command = useCommand((cmd) => cmd);
  const [image, setImage] = useState<string | null>(null);
  const [store, dispatch] = useStore((state) => state?.profile);
  const cropperRef = useRef<CropperRef>(null);
  const [base64Images, setBase64Images] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [showCrop, setShowCrop] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>('Ganti Foto');

  const handleFileInputChange = () => {
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const newImage = fileReader.result as string;

        setImage(newImage);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleOpenFileInput = () => {
    (async () => {
      if (showCrop) {
        await new Promise((resolve) => {
          fileInputRef.current?.addEventListener('change', resolve, {
            once: true
          });
          fileInputRef.current?.click();
        });

        const newFile = fileInputRef.current?.files?.[0];

        if (newFile) {
          const fileReader = new FileReader();

          fileReader.onload = () => {
            const base64Image = fileReader.result as string;
            const photoeditorFile = window.sessionStorage.getItem('fileName') || '';
            const currentPhotoEditorOutput = DEFAULT_PHOTOEDITOR;

            let updatedPhotoEditorOutput: PhotoEditorModel = currentPhotoEditorOutput; // Initialize with current value or default

            if (photoeditorFile === currentPhotoEditorOutput?.fileName || photoeditorFile === store?.profile?.profile_picture) {
              updatedPhotoEditorOutput = {
                ...currentPhotoEditorOutput,
                file: newFile,
                fileName: newFile.name,
                size: newFile.size,
                typeFile: newFile.type,
                base64Image
              };
            }

            dispatch(command.profile?.updatePhotoEditorData(updatedPhotoEditorOutput));
          };

          fileReader.readAsDataURL(newFile);
        }
      } else {
        setShowCrop(true);
        setButtonText('Ganti Foto');
      }
    })();
  };

  const handleCrop = () => {
    navigateBack();
  };

  const GenerateID = () => {
    let dt = new Date().getTime();
    // eslint-disable-next-line require-unicode-regexp
    const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;

      dt = Math.floor(dt / 16);

      // eslint-disable-next-line no-bitwise
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

    return uuid;
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const arr0 = arr[0];
    if (arr0) {
      // eslint-disable-next-line require-unicode-regexp
      const findmatch = arr0.match(/:(.*?);/);
      if (findmatch) {
        const mime = findmatch[1];
        const bstr = atob(arr[arr.length - 1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
      }
    }
  };

  const handlePreview = async () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();

      if (canvas) {
        const croppedImageData = canvas.toDataURL();

        setBase64Images((prevImages) => ({
          ...prevImages,
          [index]: croppedImageData
        }));

        const uniqueId = `${GenerateID()}.png`;
        const croppedFile = dataURLtoFile(croppedImageData, uniqueId);
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };

        if (croppedFile) {
          try {
            const compressedFile = await imageCompression(croppedFile, options);

            const compressedFileBase64 = (await toBase64(
              compressedFile
            )) as string;

            dispatch(
              command.profile?.updatePhotoEditorData({
                ...store?.photoeditor,
                file: compressedFile,
                fileName: compressedFile.name,
                size: compressedFile.size,
                typeFile: compressedFile.type,
                base64Image: compressedFileBase64
              })
            );

            onCrop(compressedFileBase64);
          } catch (error) {
            console.error(error);
          }
        } else {
          onCrop(croppedImageData);
        }
      }
    }

    setShowCrop(false);
  };

  useEffect(() => {
    if (filePhoto) {
      if (typeof filePhoto === 'string') {
        setImage(filePhoto);
      } else if (filePhoto instanceof File) {
        setImage(URL.createObjectURL(filePhoto));
      } else {
        console.error('Invalid filePhoto type:', typeof filePhoto);
      }
    }
  }, [filePhoto]);

  useEffect(() => {
    fileInputRef.current = document.createElement('input');
    fileInputRef.current.type = 'file';
    fileInputRef.current.accept = 'image/*';
    fileInputRef.current.style.display = 'none';
    fileInputRef.current.addEventListener('change', handleFileInputChange);
    document.body.appendChild(fileInputRef.current);

    return () => {
      if (fileInputRef.current) {
        document.body.removeChild(fileInputRef.current);
      }
    };
  }, []);

  return (
    <>
      {image
        ? (
        <div style={{ position: 'fixed', top: '5rem', left: 0, right: 0, bottom: 0 }}>
          {showCrop
            ? (
            <TwitterCropper
              className="cropper"
              ref={cropperRef}
              src={image} />
            )
            : null}
          {!showCrop && (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {Object.entries(base64Images).map(([filePhoto, base64Image]) => (
                <img
                  alt={`Cropped ${filePhoto}`}
                  key={filePhoto}
                  src={base64Image}
                  style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }} />
              ))}
            </div>
          )}
        </div>
        )
        : null}

      <Card
        sx={{
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          padding: '1rem',
          position: 'fixed',
          textAlign: 'center',
          width: '100%'
        }}
      >
        <Grid
          container={true}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem'
          }}
        >
          <Grid item={true} sx={{ marginBottom: '1rem' }} xs={6}>
            <Button
              color="primary"
              size="medium"
              style={{ textTransform: 'none', width: '80%' }}
              variant="outlined"
              onClick={handleOpenFileInput}
            >
              {showCrop ? 'Ganti Foto' : 'Batal'}
            </Button>
          </Grid>
          <Grid item={true} sx={{ marginBottom: '1rem' }} xs={6}>
              <Button
                color="primary"
                size="medium"
                style={{
                  textTransform: 'none',
                  width: '80%',
                  marginLeft: '1rem'
                }}
                variant="contained"
                onClick={showCrop ? handlePreview : handleCrop}
              >
                { showCrop ? 'Tampilkan' : 'Simpan'}
              </Button>
          </Grid>
        </Grid>
      </Card>
      {children}
    </>
  );
};

PhotoEditor.displayName = 'PhotoEditor';
export { PhotoEditor };
