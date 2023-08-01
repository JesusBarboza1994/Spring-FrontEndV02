import { grey } from "@mui/material/colors";
import { useAuth } from "../context/auth-context";

export const colors = {
  gray:{
    dark:"#212121",
    medium: "#333649",
    light: "#C7CADE"
  },
  blue:{
    100: "#086CB5",
    200: "#212438"
  },
  stone: {
    50: "#FAFAF9",
    100: "#F5F5F4",
    200: "#E7E5E4",
    300: "#D6D3D1",
    400: "#A8A29E",
    500: "#78716C",
    600: "#57534E",
    700: "#44403C",
    800: "#292524",
    900: "#1C1917",
  },
  black: "#171717",
  white: "#FFFFFF",
  gray: "#5B5B5B",
  purple: "#adc5fff1",
  back: "#fc1221c5",
  grey: grey,
  red: "#EE7272",

  black_one: "#363636",
  black_two: "#0B090A",
  black_three: "161A1D",
  
  red_one: "660708",
  red_two: "A4161A",
  red_three: "BA181B",
  red_four: "E5383B",
  
  gray_one: "B1A7A6",
  gray_two: "D3D3D3",
  gray_three: "F5F3F4",

  white_one: "FFFFFF",

};

export const ColorStyle = (dark) =>{
  
  return {
    text: dark ? colors.white : colors.black,
    background: colors.black,
    button: colors.blue[100],
    mainText: colors.blue[100],
    mainBackground: dark ? colors.black : colors.white,
    backCard: dark ? colors.blue[200]: colors.gray.light,
    textHover: dark ? colors.gray.light : colors.white,
    switch: dark ? colors.black : colors.white,
    buttonNav: dark ? colors.blue[100] : colors.blue[100]
  }
}