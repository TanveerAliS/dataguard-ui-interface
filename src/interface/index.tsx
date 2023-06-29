export interface Plugins {
  title: string;
  description: string;
}

export interface TabData {
  id?: string;
  title: string;
  icon: string;
  active: string[];
  disabled: string[];
  inactive: string[];
}

export interface PluginData {
  isActive?: boolean;
  isDisabled?: boolean;
  isInactive?: boolean;
  title: string;
  description: string;
}

export interface CurrentContent {
  title: string;
  tabId: string;
  plugins: PluginData[];
}
