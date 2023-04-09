import { en } from 'src/@i18n/translation/en/en';
import { pt_br } from 'src/@i18n/translation/pt_br/pt_br';

export async function init(language: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const i18next = require('i18next');

  await i18next.init({
    lng: language,
    compatibilityJSON: 'v3',
    debug: false,
    resources: {
      en: {
        translation: en,
      },
      pt_br: {
        translation: pt_br,
      },
    },
    interpolation: {
      formatSeparator: ',',
      format: function (value, formatting, lng) {
        // if (value instanceof Date) return moment(value).format(formatting);
        return value.toString();
      },
    },
  });
}
