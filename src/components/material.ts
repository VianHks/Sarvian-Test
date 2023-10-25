/* eslint-disable import/max-dependencies */
// +re-export from @mui/material

import { default as Alert } from '@mui/material/Alert';
import { default as AppBar } from '@mui/material/AppBar';
import { default as Avatar } from '@mui/material/Avatar';
import { default as Badge } from '@mui/material/Badge';
import { default as Box } from '@mui/material/Box';
import { default as Button } from '@mui/material/Button';
import { default as Card } from '@mui/material/Card';
import { default as CardContent } from '@mui/material/CardContent';
import { default as CardHeader } from '@mui/material/CardHeader';
import { default as Checkbox } from '@mui/material/Checkbox';
import { default as Chip } from '@mui/material/Chip';
import { default as CircularProgress } from '@mui/material/CircularProgress';
import { default as ClickAwayListener } from '@mui/material/ClickAwayListener';
import { default as Collapse } from '@mui/material/Collapse';
import { default as CssBaseline } from '@mui/material/CssBaseline';
import { default as Divider } from '@mui/material/Divider';
import { default as Drawer } from '@mui/material/Drawer';
import { default as Fab } from '@mui/material/Fab';
import { default as Fade } from '@mui/material/Fade';
import { default as FormControlLabel } from '@mui/material/FormControlLabel';
import { default as GlobalStyles } from '@mui/material/GlobalStyles';
import { default as Grid } from '@mui/material/Grid';
import { default as IconButton } from '@mui/material/IconButton';
import { default as InputAdornment } from '@mui/material/InputAdornment';
import { default as List } from '@mui/material/List';
import { default as ListItem } from '@mui/material/ListItem';
import { default as ListItemButton } from '@mui/material/ListItemButton';
import { default as ListItemIcon } from '@mui/material/ListItemIcon';
import { default as ListSubheader } from '@mui/material/ListSubheader';
import { default as Menu } from '@mui/material/Menu';
import { default as MenuItem } from '@mui/material/MenuItem';
import { default as Paper } from '@mui/material/Paper';
import { default as Radio } from '@mui/material/Radio';
import { default as RadioGroup } from '@mui/material/RadioGroup';
import { default as Stack } from '@mui/material/Stack';
import { default as SwipeableDrawer } from '@mui/material/SwipeableDrawer';
import { default as Switch } from '@mui/material/Switch';
import { default as Table } from '@mui/material/Table';
import { default as TableBody } from '@mui/material/TableBody';
import { default as TableCell } from '@mui/material/TableCell';
import { default as TableContainer } from '@mui/material/TableContainer';
import { default as TableHead } from '@mui/material/TableHead';
import { default as TableRow } from '@mui/material/TableRow';
import { default as Toolbar } from '@mui/material/Toolbar';
import { default as Typography } from '@mui/material/Typography';
import { default as Zoom } from '@mui/material/Zoom';
import { createTheme, responsiveFontSizes, styled, ThemeProvider, useTheme } from '@mui/material/styles';
import { default as useMediaQuery } from '@mui/material/useMediaQuery';
import { default as useScrollTrigger } from '@mui/material/useScrollTrigger';

import type { ComponentsPropsList, PaletteMode } from '@mui/material';
import type { AlertProps } from '@mui/material/Alert';
import type { AppBarProps } from '@mui/material/AppBar';
import type { AvatarProps } from '@mui/material/Avatar';
import type { BadgeProps } from '@mui/material/Badge';
import type { BoxProps } from '@mui/material/Box';
import type { ButtonProps } from '@mui/material/Button';
import type { CardProps } from '@mui/material/Card';
import type { CardContentProps } from '@mui/material/CardContent';
import type { CardHeaderProps } from '@mui/material/CardHeader';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { ChipProps } from '@mui/material/Chip';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import type { ClickAwayListenerProps } from '@mui/material/ClickAwayListener';
import type { CollapseProps } from '@mui/material/Collapse';
import type { DividerProps } from '@mui/material/Divider';
import type { DrawerProps } from '@mui/material/Drawer';
import type { FabProps } from '@mui/material/Fab';
import type { FadeProps } from '@mui/material/Fade';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { GridProps } from '@mui/material/Grid';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { InputAdornmentProps } from '@mui/material/InputAdornment';
import type { ListProps } from '@mui/material/List';
import type { ListItemProps } from '@mui/material/ListItem';
import type { ListItemButtonProps } from '@mui/material/ListItemButton';
import type { ListItemIconProps } from '@mui/material/ListItemIcon';
import type { ListSubheaderProps } from '@mui/material/ListSubheader';
import type { MenuProps } from '@mui/material/Menu';
import type { MenuItemProps } from '@mui/material/MenuItem';
import type { PaperProps } from '@mui/material/Paper';
import type { RadioProps } from '@mui/material/Radio';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { StackProps } from '@mui/material/Stack';
import type { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer';
import type { SwitchProps } from '@mui/material/Switch';
import type { TableProps } from '@mui/material/Table';
import type { TableBodyProps } from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TableContainerProps } from '@mui/material/TableContainer';
import type { TableHeadProps } from '@mui/material/TableHead';
import type { TableRowProps } from '@mui/material/TableRow';
import type { ToolbarProps } from '@mui/material/Toolbar';
import type { TypographyProps } from '@mui/material/Typography';
import type { ZoomProps } from '@mui/material/Zoom';
import type { Direction, SxProps, Theme, ThemeOptions } from '@mui/material/styles';

export {
  createTheme, responsiveFontSizes, styled, ThemeProvider, useTheme,
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  Fab,
  Fade,
  FormControlLabel,
  GlobalStyles,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  Zoom
};

export type {
  AlertProps,
  AppBarProps,
  AvatarProps,
  BadgeProps,
  BoxProps,
  ButtonProps,
  CardProps,
  CardContentProps,
  CardHeaderProps,
  CheckboxProps,
  ChipProps,
  CircularProgressProps,
  ClickAwayListenerProps,
  CollapseProps,
  ComponentsPropsList,
  DividerProps,
  DrawerProps,
  FabProps,
  FadeProps,
  FormControlLabelProps,
  GridProps,
  IconButtonProps,
  InputAdornmentProps,
  ListProps,
  ListItemProps,
  ListItemButtonProps,
  ListItemIconProps,
  ListSubheaderProps,
  MenuProps,
  MenuItemProps,
  PaperProps,
  RadioProps,
  RadioGroupProps,
  StackProps,
  SwipeableDrawerProps,
  SwitchProps,
  TableProps,
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableHeadProps,
  TableRowProps,
  ToolbarProps,
  TypographyProps,
  Direction,
  PaletteMode,
  SxProps,
  Theme,
  ThemeOptions,
  ZoomProps
};
