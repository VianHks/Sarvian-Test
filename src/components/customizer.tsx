import { useState } from 'react';

import { Settings as SettingsIcon, X as XIcon } from '@nxweb/icons/tabler';
import { ScrollBar } from '@nxweb/react-bootstrap';

import {
  Box, Divider, FormControlLabel, IconButton,
  Drawer as MuiDrawer, Radio, RadioGroup, styled, Switch, Typography
} from '@components/material.js';
import type { BoxProps, DrawerProps } from '@components/material.js';
import { useSettings } from '@hooks/use-settings.js';
import type { Settings } from '@hooks/use-settings.js';

const Toggler = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderBottomLeftRadius: theme.shape.borderRadius,
  borderTopLeftRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  cursor: 'pointer',
  display: 'flex',
  padding: theme.spacing(2),
  position: 'fixed',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: theme.zIndex.modal
}));

const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  width: 400,
  zIndex: theme.zIndex.modal,

  '& .MuiDrawer-paper': {
    border: 0,
    boxShadow: theme.shadows[9],
    width: 400,
    zIndex: theme.zIndex.modal
  },
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  }
}));

const CustomizerSpacing = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 6)
}));

const ColorBox = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  height: 45,
  margin: theme.spacing(2.5, 1.75, 1.75),
  transition: 'margin .25s ease-in-out, width .25s ease-in-out, height .25s ease-in-out, box-shadow .25s ease-in-out',
  width: 45,

  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

const Customizer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { settings, saveSettings } = useSettings();

  const {
    mode,
    appBar,
    footer,
    navHidden,
    navToggleType,
    direction,
    appBarBlur,
    themeColor,
    navCollapsed
  } = settings;

  const handleChange = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value });
  };

  return (
    <div className="customizer">
      <Toggler className="customizer-toggler" onClick={() => setOpen(true)}>
        <SettingsIcon fontSize="1.375rem" />
      </Toggler>
      <Drawer anchor="right" hideBackdrop={true} open={open} variant="persistent">
        <Box
          className="customizer-header"
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            p: (theme) => theme.spacing(3.5, 5),
            position: 'relative'
          }}
        >
          <Typography sx={{ fontWeight: 600, textTransform: 'uppercase' }} variant="h6">
            Theme Customizer
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Customize & Preview in Real Time</Typography>
          <IconButton
            sx={{
              color: 'text.secondary',
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            onClick={() => setOpen(false)}
          >
            <XIcon />
          </IconButton>
        </Box>
        <ScrollBar options={{ wheelPropagation: false }}>
          <CustomizerSpacing className="customizer-body">
            <Typography
              component="p"
              sx={{
                color: 'text.disabled',
                mb: 5,
                textTransform: 'uppercase'
              }}
              variant="caption"
            >
              Theming
            </Typography>

            {/* Mode */}
            <Box sx={{ mb: 5 }}>
              <Typography>Mode</Typography>
              <RadioGroup
                row={true}
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
                value={mode}
                onChange={(e) => handleChange('mode', e.target.value as Settings[keyof Settings])}
              >
                <FormControlLabel control={<Radio />} label="Light" value="light" />
                <FormControlLabel control={<Radio />} label="Dark" value="dark" />
              </RadioGroup>
            </Box>

            {/* Color Picker */}
            <div>
              <Typography>Primary Color</Typography>
              <Box sx={{ display: 'flex' }}>
                <ColorBox
                  sx={{
                    backgroundColor: '#7367F0',
                    ...themeColor === 'primary'
                      ? {
                        height: 53,
                        m: (theme) => theme.spacing(1.5, 0.75, 0),
                        width: 53
                      }
                      : {}
                  }}
                  onClick={() => handleChange('themeColor', 'primary')} />
                <ColorBox
                  sx={{
                    backgroundColor: 'secondary.main',
                    ...themeColor === 'secondary'
                      ? {
                        height: 53,
                        m: (theme) => theme.spacing(1.5, 0.75, 0),
                        width: 53
                      }
                      : {}
                  }}
                  onClick={() => handleChange('themeColor', 'secondary')} />
                <ColorBox
                  sx={{
                    backgroundColor: 'success.main',
                    ...themeColor === 'success'
                      ? {
                        height: 53,
                        m: (theme) => theme.spacing(1.5, 0.75, 0),
                        width: 53
                      }
                      : {}
                  }}
                  onClick={() => handleChange('themeColor', 'success')} />
                <ColorBox
                  sx={{
                    backgroundColor: 'error.main',
                    ...themeColor === 'error'
                      ? {
                        height: 53,
                        m: (theme) => theme.spacing(1.5, 0.75, 0),
                        width: 53
                      }
                      : {}
                  }}
                  onClick={() => handleChange('themeColor', 'error')} />
                <ColorBox
                  sx={{
                    backgroundColor: 'warning.main',
                    ...themeColor === 'warning'
                      ? {
                        height: 53,
                        m: (theme) => theme.spacing(1.5, 0.75, 0),
                        width: 53
                      }
                      : {}
                  }}
                  onClick={() => handleChange('themeColor', 'warning')} />
                <ColorBox
                  sx={{
                    backgroundColor: 'info.main',
                    ...themeColor === 'info'
                      ? {
                        height: 53,
                        m: (theme) => theme.spacing(1.5, 0.75, 0),
                        width: 53
                      }
                      : {}
                  }}
                  onClick={() => handleChange('themeColor', 'info')} />
              </Box>
            </div>
          </CustomizerSpacing>

          <Divider sx={{ m: '0 !important' }} />

          <CustomizerSpacing className="customizer-body">
            <Typography
              component="p"
              sx={{
                color: 'text.disabled',
                mb: 5,
                textTransform: 'uppercase'
              }}
              variant="caption"
            >
              Layout
            </Typography>

            {/* AppBar */}
            <Box sx={{ mb: 5 }}>
              <Typography>AppBar Type</Typography>
              <RadioGroup
                row={true}
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
                value={appBar}
                onChange={(e) => handleChange('appBar', e.target.value as Settings['appBar'])}
              >
                <FormControlLabel control={<Radio />} label="Fixed" value="fixed" />
                <FormControlLabel control={<Radio />} label="Static" value="static" />
                <FormControlLabel control={<Radio />} label="Hidden" value="hidden" />
              </RadioGroup>
            </Box>

            {/* Footer */}
            <Box sx={{ mb: 5 }}>
              <Typography>Footer Type</Typography>
              <RadioGroup
                row={true}
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
                value={footer}
                onChange={(e) => handleChange('footer', e.target.value as Settings['footer'])}
              >
                <FormControlLabel control={<Radio />} label="Fixed" value="fixed" />
                <FormControlLabel control={<Radio />} label="Static" value="static" />
                <FormControlLabel control={<Radio />} label="Hidden" value="hidden" />
              </RadioGroup>
            </Box>

            {/* AppBar Blur */}
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography>AppBar Blur</Typography>
              <Switch
                checked={appBarBlur}
                name="appBarBlur"
                onChange={(e) => handleChange('appBarBlur', e.target.checked)} />
            </Box>
          </CustomizerSpacing>

          <Divider sx={{ m: '0 !important' }} />

          <CustomizerSpacing className="customizer-body">
            <Typography
              component="p"
              sx={{
                color: 'text.disabled',
                mb: 5,
                textTransform: 'uppercase'
              }}
              variant="caption"
            >
              Menu
            </Typography>

            {/* Menu Toggle */}
            {navHidden
              ? null
              : (
              <Box sx={{ mb: 5 }}>
                <Typography>Menu Toggle</Typography>
                <RadioGroup
                  row={true}
                  sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
                  value={navToggleType}
                  onChange={(e) => handleChange('navToggleType', e.target.value as Settings['navToggleType'])}
                >
                  <FormControlLabel control={<Radio />} label="Accordion" value="accordion" />
                  <FormControlLabel control={<Radio />} label="Collapse" value="collapse" />
                </RadioGroup>
              </Box>
              )}

            {/* Menu Collapsed */}
            {navHidden
              ? null
              : (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 5
                }}
              >
                <Typography>Menu Collapsed</Typography>
                <Switch
                  checked={navCollapsed}
                  name="navCollapsed"
                  onChange={(e) => handleChange('navCollapsed', e.target.checked)} />
              </Box>
              )}

            {/* Menu Hidden */}
            {appBar === 'hidden'
              ? null
              : (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Menu Hidden</Typography>
                <Switch
                  checked={navHidden}
                  name="navHidden"
                  onChange={(e) => handleChange('navHidden', e.target.checked)} />
              </Box>
              )}
          </CustomizerSpacing>

          <Divider sx={{ m: '0 !important' }} />

          <CustomizerSpacing className="customizer-body">
            <Typography
              component="p"
              sx={{
                color: 'text.disabled',
                mb: 5,
                textTransform: 'uppercase'
              }}
              variant="caption"
            >
              Misc
            </Typography>

            {/* RTL */}
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                mb: 5
              }}
            >
              <Typography>RTL</Typography>
              <Switch
                checked={direction === 'rtl'}
                name="direction"
                onChange={(e) => handleChange('direction', e.target.checked ? 'rtl' : 'ltr')} />
            </Box>
          </CustomizerSpacing>
        </ScrollBar>
      </Drawer>
    </div>
  );
};

Customizer.displayName = 'Customizer';

export { Customizer };
