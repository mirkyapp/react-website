import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
  styles: {
    global: {
      body: {
        bg: '#010715',
        color: 'white',
      },
    },
  },
  colors: {
    brandPink: {
      100: "#F086C5",
      200: "#ED68B7",
      300: "#E94AA8",
      400: "#E62B9A",
      500: "#E20D8B",
      600: "#C60B7A",
      700: "#A90A68",
      800: "#8D0857",
      900: "#710746",
    },
    brandBlurple: {
      100: "#B2ACFA",
      200: "#9E97F8",
      300: "#8B83F7",
      400: "#776EF5",
      500: "#6459F4",
      600: "#584ED6",
      700: "#4B43B7",
      800: "#3F3899",
      900: "#322C7A",
    },
    brandBlue: {
      100: "#A4BBFD",
      200: "#8DA9FC",
      300: "#7798FC",
      400: "#6087FB",
      500: "#4976FB",
      600: "#4067DC",
      700: "#3759BC",
      800: "#2E4A9D",
      900: "#253B7D",
    },
    brandPurple: {
      100: "#D593E1",
      200: "#CA77DA",
      300: "#C05CD2",
      400: "#B541CB",
      500: "#AB26C3",
      600: "#9621AB",
      700: "#801D92",
      800: "#6B187A",
      900: "#551362",
    }
  }
}

// 3. extend the theme
const theme = extendTheme(config)

export default theme