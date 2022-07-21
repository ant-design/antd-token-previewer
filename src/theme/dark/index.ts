import {
  textMapToken,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgMapToken,
  borderMapToken,
} from './mapToken';
import { genComponentToken, genAliasToken } from '../token';

console.log(bgMapToken);
// 全局 Alias Token
export const aliasToken = genAliasToken({
  textMapToken,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgMapToken,
  borderMapToken,
});

export const componentToken = genComponentToken({
  textMapToken,
  bgMapToken,
});
