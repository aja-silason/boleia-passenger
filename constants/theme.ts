import { Platform } from 'react-native';

export const Colors = {
    text: '#ECEDEE',
    placeHolder: "#BEC2CE",
    inactive: "#EAF1F4",
    placeholderText: "#4D4D4D",
    cardBackground: "#F9FBFC",
    success: "#0A6443",
    error: "#9C1B1B",
    background: '#121212',
    blackText: '#202020',
    blue: "#103173",
    primary: "#F2DF1E",
    orange: "#F59E0B"
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
