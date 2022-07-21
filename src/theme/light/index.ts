import type { GlobalToken } from 'antd/es/theme/interface';

import {
  textMapToken,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgMapToken,
} from './mapToken';
import { genAliasToken, genComponentToken } from '../token';

// 全局 Alias Token
export const aliasToken: Partial<GlobalToken> = genAliasToken({
  textMapToken,
  primaryPalettes,
  errorPalettes,
  successPalettes,
  warningPalettes,
  bgMapToken: bgMapToken,
});

export const componentToken = genComponentToken({
  textMapToken,
  bgMapToken: bgMapToken,
});
