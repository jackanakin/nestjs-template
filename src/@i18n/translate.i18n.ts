import { i18n } from 'i18next';
import { User } from 'src/users/entity/user.entity';

export default class i18nManager {
  private static instance: i18nManager;
  private i18next: i18n;

  constructor(i18next: i18n) {
    this.i18next = i18next;
  }

  public static getInstance(): i18nManager {
    if (!i18nManager.instance) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const i18next: i18n = require('i18next');

      i18nManager.instance = new i18nManager(i18next);
    }

    return i18nManager.instance;
  }

  t(user: User, key: string): string {
    if (user && user.language) {
      return this.i18next.t(key, { lng: user.language });
    } else {
      return this.i18next.t(key);
    }
  }
}
