import { ClientItem, ContactItem, ExperienceItem, ServiceItem } from '../types';

export type Language = 'ru' | 'en';

type HeroContent = {
  fullName: string;
  firstName: string;
  lastName: string;
  subtitle: string;
  portraitAlt: string;
};

type MobileContent = {
  experienceTitle: string;
  experienceItems: ExperienceItem[];
  servicesTitle: string;
  services: ServiceItem[];
  clientsTitle: string;
  clients: ClientItem[];
  presentationCta: string;
  contactsTitle: string;
};

type DesktopContent = {
  experienceTitle: string;
  experienceItems: string[];
  servicesTitle: string;
  services: ServiceItem[];
  clientsTitle: string;
  clients: string[];
  presentationLinkText: string;
  contactsTitle: string;
};

type MiniContent = {
  subtitle: string;
  experiencePrimary: string;
  experienceSecondary: string;
  format: string;
  highlights: string[];
};

type UiContent = {
  languageToggleAria: string;
  switchToRussianAria: string;
  switchToEnglishAria: string;
  themeToggleAria: string;
};

type SeoContent = {
  title: string;
  description: string;
};

export type SiteLanguageContent = {
  hero: HeroContent;
  mobile: MobileContent;
  desktop: DesktopContent;
  mini: MiniContent;
  contacts: ContactItem[];
  ui: UiContent;
  seo: SeoContent;
};

const contactItems: ContactItem[] = [
  {
    icon: 'fas fa-phone',
    value: '+7 999 164 99 19',
    href: 'tel:+79991649919'
  },
  {
    icon: 'fab fa-telegram-plane',
    value: '@timur_panfilovich',
    href: 'https://t.me/timur_panfilovich',
    target: '_blank'
  },
  {
    icon: 'fas fa-envelope',
    value: 'panfilov.timur@gmail.com',
    href: 'mailto:panfilov.timur@gmail.com'
  }
];

export const siteContent: Record<Language, SiteLanguageContent> = {
  ru: {
    hero: {
      fullName: 'Тимур Панфилов',
      firstName: 'Тимур',
      lastName: 'Панфилов',
      subtitle: 'Застройка // Декор',
      portraitAlt: 'Тимур Панфилов'
    },
    mobile: {
      experienceTitle: 'Опыт',
      experienceItems: [
        { icon: 'fas fa-hammer', text: '10+ лет в производстве' },
        { icon: 'fas fa-calendar-check', text: '5+ лет в ивенте' },
        { icon: 'fas fa-map-marker-alt', text: 'Формат: фестивали, конференции, ЭКСПО' },
        { icon: 'fas fa-users', text: 'Масштабы: от 500 до 5000 человек' }
      ],
      servicesTitle: 'Услуги',
      services: [
        {
          title: 'Смета для тендера',
          description: 'Быстрый и точный расчет стоимости застройки для участия в тендере.'
        },
        {
          title: 'Реализация под ключ',
          description: 'Полный цикл производства: от идеи и чертежей до монтажа и демонтажа.'
        },
        {
          title: 'Шеф-монтаж',
          description: 'Профессиональный контроль и руководство монтажными работами на площадке.'
        },
        {
          title: 'Стенды и ЭКСПО',
          description: 'Разработка и застройка выставочных стендов любой сложности.'
        }
      ],
      clientsTitle: 'Клиенты',
      clients: [
        { name: 'Yandex Eda' },
        { name: 'Yandex Market' },
        { name: 'Yandex Cloud' },
        { name: 'OTP Bank' },
        { name: 'T-Bank' },
        { name: 'Gazprombank' },
        { name: 'HH.ru' },
        { name: 'T1' }
      ],
      presentationCta: 'Презентация',
      contactsTitle: 'Контакты'
    },
    desktop: {
      experienceTitle: 'Опыт',
      experienceItems: [
        '10+ лет в производстве',
        '5+ лет в ивенте',
        'Формат: фестивали, конференции, ЭКСПО',
        'Масштабы: от 500 до 5000 человек'
      ],
      servicesTitle: 'Запросы',
      services: [
        {
          title: 'Тендерные сметы',
          description: 'Детальная проработка тендерных смет любой сложности с учетом всех технических нюансов производства.'
        },
        {
          title: 'Застройка под ключ',
          description: 'Полный цикл реализации: от чертежа до финального декоративного элемента на площадке.'
        },
        {
          title: 'Шеф монтаж / демонтаж',
          description: 'Профессиональный надзор за процессами сборки и разборки конструкций на объекте.'
        },
        {
          title: 'Проекты ЭКСПО',
          description: 'Разработка и реализация индивидуальных выставочных стендов и масштабных ЭКСПО пространств.'
        }
      ],
      clientsTitle: 'Клиенты',
      clients: ['Яндекс Еда', 'Яндекс Маркет', 'Яндекс Cloud', 'ОТП Банк', 'Т-Банк', 'Газпромбанк', 'HH.ru', 'Т1'],
      presentationLinkText: 'Ссылка на презентацию',
      contactsTitle: 'Контакты'
    },
    mini: {
      subtitle: 'Застройка и декор мероприятий',
      experiencePrimary: '10+ лет в производстве',
      experienceSecondary: '5+ лет в ивенте',
      format: 'Формат: фестивали, конференции, ЭКСПО',
      highlights: ['Тендерные сметы', 'Застройка под ключ', 'Шеф-монтаж и ЭКСПО']
    },
    contacts: contactItems,
    ui: {
      languageToggleAria: 'Переключатель языка',
      switchToRussianAria: 'Переключить на русский язык',
      switchToEnglishAria: 'Switch to English',
      themeToggleAria: 'Переключить тему'
    },
    seo: {
      title: 'Тимур Панфилов | Застройка, декор, тендерные сметы, ЭКСПО',
      description:
        'Тимур Панфилов: застройка и декор мероприятий, тендерные сметы, шеф-монтаж, стенды и проекты ЭКСПО. Опыт 10+ лет в производстве и 5+ лет в ивенте.'
    }
  },
  en: {
    hero: {
      fullName: 'Timur Panfilov',
      firstName: 'Timur',
      lastName: 'Panfilov',
      subtitle: 'Event Build // Decor',
      portraitAlt: 'Timur Panfilov'
    },
    mobile: {
      experienceTitle: 'Experience',
      experienceItems: [
        { icon: 'fas fa-hammer', text: '10+ years in production' },
        { icon: 'fas fa-calendar-check', text: '5+ years in events' },
        { icon: 'fas fa-map-marker-alt', text: 'Formats: festivals, conferences, EXPO' },
        { icon: 'fas fa-users', text: 'Scale: from 500 to 5,000 attendees' }
      ],
      servicesTitle: 'Services',
      services: [
        {
          title: 'Tender Budgeting',
          description: 'Fast and accurate build-cost estimation for tender participation.'
        },
        {
          title: 'Turnkey Delivery',
          description: 'Full production cycle: from concept and drawings to installation and dismantling.'
        },
        {
          title: 'Supervising Installation',
          description: 'Professional on-site supervision and coordination of installation works.'
        },
        {
          title: 'Booths and EXPO',
          description: 'Design and build of exhibition booths of any complexity.'
        }
      ],
      clientsTitle: 'Clients',
      clients: [
        { name: 'Yandex Food' },
        { name: 'Yandex Market' },
        { name: 'Yandex Cloud' },
        { name: 'OTP Bank' },
        { name: 'T-Bank' },
        { name: 'Gazprombank' },
        { name: 'HH.ru' },
        { name: 'T1' }
      ],
      presentationCta: 'Presentation',
      contactsTitle: 'Contacts'
    },
    desktop: {
      experienceTitle: 'Experience',
      experienceItems: [
        '10+ years in production',
        '5+ years in events',
        'Formats: festivals, conferences, EXPO',
        'Scale: from 500 to 5,000 attendees'
      ],
      servicesTitle: 'Services',
      services: [
        {
          title: 'Tender Budgeting',
          description: 'Detailed tender budgeting of any complexity, with all production and technical specifics included.'
        },
        {
          title: 'Turnkey Event Build',
          description: 'End-to-end execution: from drawings to the final decorative element on site.'
        },
        {
          title: 'Supervising Install / Dismantling',
          description: 'Professional oversight of installation and dismantling processes at the venue.'
        },
        {
          title: 'EXPO Projects',
          description: 'Custom design and delivery of exhibition booths and large-scale EXPO spaces.'
        }
      ],
      clientsTitle: 'Clients',
      clients: ['Yandex Food', 'Yandex Market', 'Yandex Cloud', 'OTP Bank', 'T-Bank', 'Gazprombank', 'HH.ru', 'T1'],
      presentationLinkText: 'Link to presentation',
      contactsTitle: 'Contacts'
    },
    mini: {
      subtitle: 'Event Build and Decor',
      experiencePrimary: '10+ years in production',
      experienceSecondary: '5+ years in events',
      format: 'Formats: festivals, conferences, EXPO',
      highlights: ['Tender Budgeting', 'Turnkey Event Build', 'Supervising Installation and EXPO']
    },
    contacts: contactItems,
    ui: {
      languageToggleAria: 'Language switcher',
      switchToRussianAria: 'Switch to Russian',
      switchToEnglishAria: 'Switch to English',
      themeToggleAria: 'Toggle theme'
    },
    seo: {
      title: 'Timur Panfilov | Event Build, Decor, Tender Budgeting, EXPO',
      description:
        'Timur Panfilov: event build and decor, tender budgeting, supervising installation, exhibition booths and EXPO projects. 10+ years in production and 5+ years in events.'
    }
  }
};
