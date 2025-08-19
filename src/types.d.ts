import type { TelegramWebApp } from './types/telegram/types';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
