import { config } from '@vue/test-utils';

config.global.mocks = {
  $t: tKey => tKey, // just return translation key
  t: tKey => tKey, // just return translation key
};