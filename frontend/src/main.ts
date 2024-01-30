import './assets/main.css';
import 'primevue/resources/themes/lara-dark-blue/theme.css';
import '@/utils/jsPrototypeExtension';

import 'moment/dist/locale/de';
import 'moment/dist/locale/es.js';
import 'moment/dist/locale/en-gb.js';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import Card from 'primevue/card';
import PrimeVue from 'primevue/config';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import CountryFlag from 'vue-country-flag-next';

import App from './App.vue';
import router from './router';

import ButtonWithIcon from '@/components/elements/ButtonWithIcon.vue';
import { i18n } from '@/i18n/config';

const app = createApp(App);

/* add font awesome icon component */
app.component('font-awesome-icon', FontAwesomeIcon);
// eslint-disable-next-line vue/no-reserved-component-names,vue/multi-word-component-names
app.component('Button', ButtonWithIcon);
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Image', Image);
app.component('InputText', InputText);
app.component('Card', Card);
app.component('CountryFlag', CountryFlag);

app.directive('tooltip', Tooltip);

/* add all icon we need to the font-awesome library */
import '/src/icons/fontAwesomeIconsConfig';

app.use(PrimeVue);
app.use(ToastService);
app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount('#app');
