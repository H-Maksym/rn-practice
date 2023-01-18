export const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    whiteAlpha: '#ffffff60',
    accent: '#F59256',
    hover: '#ff6101',
    primaryBackground: '#FFFFFF',
    imageBackground: '#F6F6F6',
    // burgerBackground: '#FDF7F2',
    border: '#E8E8E8',
    loader: '#F5925650',

    text: {
      sectionTitle: '#212121',
      primaryText: '#212121',
      secondaryText: '#BDBDBD',
      shadowText: '#21212180',
      emailText: '#21212180',
      // accent: '#F59256',
      link: '#1B4371',
    },

    button: {
      primaryBackground: '#FF6C00',
      secondaryBackground: '#F6F6F6',
      accent: '#FF6C00',
      border: '#FF6C00',
      primaryText: '#FFFFFF',
      secondaryText: '#FFFFFF',
      iconLogOut: '#BDBDBD',
      iconComments: '#BDBDBD',
      iconLike: '#BDBDBD',
      iconLocation: '#BDBDBD',
      none: 'transparent',
    },

    form: {
      formTitle: '#111111',
      formText: '#212121',
      formPlaceholder: 'red',
      formInputBackground: '#F6F6F6',
      formInputBorder: '#E8E8E8',
      formInputBackgroundAccent: '#FFFFFF',
      formInputBorderAccent: '#FF6C00',

      formErrorMessage: '#FF0800',
      // checkboxText: '#9B9FAA',
      // checkboxAccentText: '#FC842D',
      // checkboxAccent: '#FC842D',
      // checkboxBorder: '#E0E0E0',
    },
  },

  space: [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],

  fonts: {
    // body: 'Poppins, sans-serif',
    // heading: 'Gotham Pro, sans-serif',
    // main: 'Manrope, sans-serif',
    // forminput: 'Inter, sans-serif',

    RobotoRegular: 'Roboto-Regular',
    RobotoMedium: 'Roboto-Medium',
    RobotoBold: 'Roboto-Bold',
  },

  textTransform: {
    cap: 'capitalize',
    lowCase: 'lowercase',
    upCase: 'uppercase',
  },

  fontSizes: {
    xxs: 13,
    xs: 14,
    s: 16,
    sm: 20,
    m: 24,
    l: 30,
    xl: 32,
    xxl: 48,
    xxxl: 68,
  },

  fontWeights: {
    thin: '100',
    extraLight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },

  letterSpacing: {
    xs: -1,
    s: 1,
    m: 3,
    l: 4,
    xl: 5,
    xxl: 7,
  },

  lineHeights: {
    text: 1.385,
    dataText: 19,
    form: 1.19,
    title: 22,
    titleForm: 35,
    button: 19,
    hero: 1.47,
  },

  borders: {
    none: 'none',
    normal: '1px solid',
  },

  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    x: 20,
    xl: 25,
    xxl: 30,
    xxxl: 40,
    xxxxl: 100,
    round: '50%',
  },
  animation: {
    cubic: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  breakpoints: ['320px', '480px', '768px', '1200px'],
};
