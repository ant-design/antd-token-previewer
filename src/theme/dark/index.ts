import { genAliasToken, genComponentToken } from '../token';
import {
  bgMapToken,
  borderMapToken,
  errorPalettes,
  primaryPalettes,
  successPalettes,
  textMapToken,
  warningPalettes,
} from './mapToken';

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
