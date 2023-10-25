import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import type { Direction } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { AppBarType, FooterType, NavToggleType, ThemeColor, ThemeMode } from '@layouts/types.js';

interface Settings {
  appBar?: AppBarType
  appBarBlur: boolean
  direction: Direction
  footer?: FooterType
  mode: ThemeMode
  navCollapsed: boolean
  navHidden?: boolean
  navToggleType: NavToggleType
  themeColor: ThemeColor
  toastPosition?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right'
}

type PageSpecificSettings = Partial<Settings>;

interface SettingsContextValue {
  saveSettings: (updatedSettings: Settings) => void
  settings: Settings
}

const initialSettings: Settings = {
  appBar: themeConfig.appBar,
  appBarBlur: themeConfig.appBarBlur,
  direction: themeConfig.direction,
  footer: themeConfig.footer,
  mode: themeConfig.mode,
  navCollapsed: themeConfig.navCollapsed,
  navHidden: themeConfig.navHidden,
  navToggleType: themeConfig.navToggleType,
  themeColor: 'primary',
  toastPosition: themeConfig.toastPosition
};

const staticSettings = {
  appBar: initialSettings.appBar,
  footer: initialSettings.footer,
  navHidden: initialSettings.navHidden,
  toastPosition: initialSettings.toastPosition
};

const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
});

const useSettings = (): SettingsContextValue => useContext(SettingsContext);

interface SettingsProviderProps {
  readonly children: ReactNode
  readonly pageSettings?: PageSpecificSettings
}

const restoreSettings = (): Settings | null => {
  let settings = null;

  try {
    const storedData: string | null = window.localStorage.getItem('settings');

    if (storedData) {
      settings = { ...JSON.parse(storedData), ...staticSettings };
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};

const storeSettings = (settings: Settings) => {
  const initSettings = { ...settings };

  delete initSettings.appBar;
  delete initSettings.footer;
  delete initSettings.navHidden;
  delete initSettings.toastPosition;

  window.localStorage.setItem('settings', JSON.stringify(initSettings));
};

const SettingsConsumer = SettingsContext.Consumer;

const SettingsProvider: FC<SettingsProviderProps> = ({
  children,
  pageSettings = undefined
}) => {
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  const saveSettings = useCallback((updatedSettings: Settings) => {
    storeSettings(updatedSettings);
    setSettings(updatedSettings);
  }, []);

  const value = useMemo(() => {
    return { saveSettings, settings };
  }, [settings]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings({ ...restoredSettings });
    }

    if (pageSettings) {
      setSettings({ ...settings, ...pageSettings });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSettings]);

  return (
    <SettingsContext.Provider value={value}>
    {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.displayName = 'SettingsProvider';

export { SettingsContext, SettingsConsumer, SettingsProvider, useSettings };
export type { Settings, SettingsContextValue, SettingsProviderProps };
