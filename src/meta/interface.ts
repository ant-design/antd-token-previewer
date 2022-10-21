import type { ComponentTokenMap } from 'antd/es/theme/interface';

export interface TokenMeta {
  type: string;

  // Name
  name: string;
  nameEn: string;

  // Description
  desc: string;
  descEn: string;

  // Source
  source: 'seed' | 'map' | 'alias' | 'custom' | keyof ComponentTokenMap;
}

export type TokenMetaMap = Record<string, TokenMeta>;

// 二级分类，如品牌色、中性色等
export type TokenGroup = {
  // Group name
  name: string;
  nameEn: string;

  // Description
  desc: string;
  descEn: string;

  // Seed token
  token: string | string[];
};

// 一级分类，如颜色、尺寸等
export type TokenCategory = {
  // Category name
  name: string;
  nameEn: string;

  // Description
  desc: string;
  descEn: string;

  groups: TokenGroup[];
};

export type TokenTree = TokenCategory[];
