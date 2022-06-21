import {
  textAlphaPalettes,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgPalettes,
} from './palettes';
import { genComponentToken, genAliasToken } from '../token';

// 全局 Alias Token
const aliasToken = genAliasToken({
  textAlphaPalettes,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgPalettes,
});

const componentToken = genComponentToken({
  textAlphaPalettes,
  bgPalettes,
});

export { aliasToken, componentToken };
