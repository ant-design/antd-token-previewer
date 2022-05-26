import { GlobalToken } from '@madccc/antd/lib/_util/theme/interface';
import { groupBy } from 'lodash';

export const classifyToken = (token: GlobalToken) => {
  const tokenArr: { tokenName: keyof GlobalToken; value: string }[] = [];
  Object.keys(token).forEach((key) => {
    tokenArr.push({ tokenName: key, value: token[key] });
  });

  return groupBy(tokenArr, (item) => {
    if (item.tokenName.startsWith('color')) {
      return 'color';
    }
    if (item.tokenName.startsWith('font')) {
      return 'font';
    }
    if (item.tokenName.startsWith('screen')) {
      return 'screen';
    }
    if (item.tokenName.startsWith('line')) {
      return 'line';
    }
    if (item.tokenName.startsWith('motion')) {
      return 'motion';
    }
    if (
      item.tokenName.startsWith('margin') ||
      item.tokenName.startsWith('padding')
    ) {
      return 'space';
    }
    return 'else';
  });
};