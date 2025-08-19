// Тип користувача
export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

// Тип чату (якщо Mini App запущено у чаті)
export interface TelegramChat {
  id: number;
  type: 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  photo_url?: string;
}

// Що передає Telegram у initDataUnsafe
export interface TelegramInitDataUnsafe {
  query_id?: string;
  user?: TelegramUser;
  receiver?: TelegramUser;
  chat?: TelegramChat;
  start_param?: string;
  auth_date: string;
  hash: string;
}

// Сирий рядок із даними (потрібний для перевірки hash)
export type TelegramInitData = string;

// Глобальний об’єкт WebApp
export interface TelegramWebApp {
  initData: TelegramInitData;
  initDataUnsafe: TelegramInitDataUnsafe;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;

  expand(): void;
  close(): void;
  ready(): void;
}
