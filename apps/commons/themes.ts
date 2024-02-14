import { TextStyle } from "react-native"

const color = {
    primaryCyan: '#55847A',
    primaryCyan82: '#70978F',
    primaryCyan44: '#AABFBA',
    secondaryHarp: '#EDEDED',
    secondaryNebula: '#D7D7D7',
    secondaryCat: '#3E3E3E',
    light: '#FFFFFF',
    dark: '#000000',
    error: '#F9427B',
    error50: '#F397B4',
}

const fontFamily: TextStyle = {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: color.secondaryCat,
}

type FontType = 'normal' | 'normalBold' | 'medium' | 'mediumBold' | 'large' | 'largeBold';

const font: { [key in FontType]: TextStyle } = {
    normal: { ...fontFamily, fontSize: 12 },
    normalBold: { ...fontFamily, fontSize: 12, fontWeight: '800' },
    medium: { ...fontFamily, fontSize: 14 },
    mediumBold: { ...fontFamily, fontSize: 14, fontWeight: '800' },
    large: { ...fontFamily, fontSize: 20 },
    largeBold: { ...fontFamily, fontSize: 20, fontWeight: '800' },
}

export default {
    color,
    font,
}