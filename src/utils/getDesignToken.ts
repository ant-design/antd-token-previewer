import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import type { GlobalToken } from '@madccc/antd/es/theme/interface';
import seed from '@madccc/antd/es/theme/themes/seed';
import defaultMap from '@madccc/antd/es/theme/themes/default';
import formatToken from '@madccc/antd/es/theme/util/alias';

export default function getDesignToken(config: ThemeConfig = {}): GlobalToken {
  const seedToken = { ...seed, ...config.token };
  const mapFn = config.derivative ?? defaultMap;
  const mapToken = { ...mapFn(seedToken), ...config.override };
  return formatToken(mapToken);
}
