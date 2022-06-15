import tinycolor from 'tinycolor2';

export const getAlphaColor = (baseColor: string, alpha: number) => {
  return tinycolor(baseColor).setAlpha(alpha).toRgbString();
};

export const getSolidColor = (baseColor: string, brightness: number) => {
  const instance = tinycolor(baseColor);
  return instance.lighten(brightness).toHexString();
};
