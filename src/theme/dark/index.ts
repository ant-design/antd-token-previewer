import {
  textMapToken,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgMapToken,
} from './mapToken';
import { genComponentToken, genAliasToken } from '../token';

// 全局 Alias Token
export const aliasToken = genAliasToken({
  textMapToken,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgMapToken,
});

export const componentToken = genComponentToken({
  textMapToken,
  bgMapToken,
});
