/* eslint-disable import/max-dependencies */

import { Accordion } from './overrides/accordion.js';
import { Alerts } from './overrides/alerts.js';
import { Autocomplete } from './overrides/autocomplete.js';
import { Avatar } from './overrides/avatars.js';
import { Backdrop } from './overrides/backdrop.js';
import { Badge } from './overrides/badge.js';
import { Breadcrumbs } from './overrides/breadcrumbs.js';
import { ButtonGroup } from './overrides/button-group.js';
import { Button } from './overrides/button.js';
import { Card } from './overrides/card.js';
import { Checkbox } from './overrides/checkbox.js';
import { Chip } from './overrides/chip.js';
import { DataGrid } from './overrides/dataGrid.js';
import { Dialog } from './overrides/dialog.js';
import { Divider } from './overrides/divider.js';
import { Drawer } from './overrides/drawer.js';
import { FabButton } from './overrides/fab.js';
import { IconButton } from './overrides/icon-button.js';
import { Input } from './overrides/input.js';
import { Link } from './overrides/link.js';
import { List } from './overrides/list.js';
import { Menu } from './overrides/menu.js';
import { Pagination } from './overrides/pagination.js';
import { Paper } from './overrides/paper.js';
import { Popover } from './overrides/popover.js';
import { Progress } from './overrides/progress.js';
import { Radio } from './overrides/radio.js';
import { Rating } from './overrides/rating.js';
import { Select } from './overrides/select.js';
import { Slider } from './overrides/slider.js';
import { Snackbar } from './overrides/snackbar.js';
import { Switches } from './overrides/switches.js';
import { Table } from './overrides/table.js';
import { Tabs } from './overrides/tabs.js';
import { Timeline } from './overrides/timeline.js';
import { ToggleButton } from './overrides/toggleButton.js';
import { Tooltip } from './overrides/tooltip.js';
import { Typography } from './overrides/typography.js';

export const overrides = () => {
  const chip = Chip();
  const list = List();
  const menu = Menu();
  const tabs = Tabs();
  const radio = Radio();
  const input = Input();
  const tables = Table();
  const alerts = Alerts();
  const button = Button();
  const rating = Rating();
  const slider = Slider();
  const cards = Card();
  const avatars = Avatar();
  const divider = Divider();
  const tooltip = Tooltip();
  const fabButton = FabButton();
  const dialog = Dialog();
  const checkbox = Checkbox();
  const backdrop = Backdrop();
  const dataGrid = DataGrid();
  const progress = Progress();
  const drawer = Drawer();
  const switches = Switches();
  const timeline = Timeline();
  const popover = Popover();
  const accordion = Accordion();
  const pagination = Pagination();
  const snackbar = Snackbar();
  const breadcrumb = Breadcrumbs();
  const buttonGroup = ButtonGroup();
  const autocomplete = Autocomplete();
  const link = Link();
  const badge = Badge();
  const paper = Paper();
  const select = Select();
  const iconButton = IconButton();
  const typography = Typography();
  const toggleButton = ToggleButton();

  return Object.assign(
    chip,
    list,
    menu,
    tabs,
    cards,
    radio,
    input,
    alerts,
    button,
    dialog,
    rating,
    slider,
    drawer,
    tables,
    avatars,
    divider,
    link,
    popover,
    tooltip,
    checkbox,
    backdrop,
    badge,
    dataGrid,
    paper,
    progress,
    snackbar,
    switches,
    timeline,
    accordion,
    select,
    fabButton,
    breadcrumb,
    pagination,
    buttonGroup,
    autocomplete,
    iconButton,
    typography,
    toggleButton
  );
};
