import type { AliasToken } from '../interface';
import type { TokenTree } from './interface';
import { seedRelatedAlias, seedRelatedMap } from './TokenRelation';

const category: TokenTree<keyof AliasToken> = [
  {
    name: '颜色',
    nameEn: 'Color',
    desc: '',
    descEn: '',
    groups: [
      {
        key: 'brandColor',
        name: '品牌色',
        nameEn: 'Brand Color',
        desc: '品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义。',
        descEn: '',
        seedToken: ['colorPrimary'],
        mapToken: seedRelatedMap.colorPrimary,
        aliasToken: seedRelatedAlias.colorPrimary,
      },
      {
        key: 'successColor',
        name: '成功色',
        nameEn: 'Success Color',
        desc: '',
        descEn: '',
        seedToken: ['colorSuccess'],
        mapToken: seedRelatedMap.colorSuccess,
        aliasToken: seedRelatedAlias.colorSuccess,
      },
      {
        key: 'warningColor',
        name: '警戒色',
        nameEn: 'Warning Color',
        desc: '',
        descEn: '',
        seedToken: ['colorWarning'],
        mapToken: seedRelatedMap.colorWarning,
        aliasToken: seedRelatedAlias.colorWarning,
      },
      {
        key: 'errorColor',
        name: '错误色',
        nameEn: 'Error Color',
        desc: '',
        descEn: '',
        seedToken: ['colorError'],
        mapToken: seedRelatedMap.colorError,
        aliasToken: seedRelatedAlias.colorError,
      },
      {
        key: 'infoColor',
        name: '信息色',
        nameEn: 'Info Color',
        desc: '',
        descEn: '',
        seedToken: ['colorInfo'],
        mapToken: seedRelatedMap.colorInfo,
        aliasToken: seedRelatedAlias.colorInfo,
      },
      {
        key: 'neutralColor',
        name: '中性色',
        nameEn: 'Neutral Color',
        desc: '中性色主要被大量的应用在界面的文字、背景、边框和填充的 4 种场景。合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。',
        descEn: '',
        seedToken: ['colorTextBase', 'colorBgBase'],
        mapToken: seedRelatedMap.colorTextBase?.concat(
          seedRelatedMap.colorBgBase ?? [],
        ),
        aliasToken: seedRelatedAlias.colorTextBase?.concat(
          seedRelatedAlias.colorBgBase ?? [],
        ),
        aliasTokenDescription:
          '你可以利用 Alias Token 来精准控制部分组件的效果。例如 Input 、InputNumber、Select 等Control 类组件都共享了相同的 controlXX token 。只需修改值，即可实现不改变 Button 的情况下，修改 Control 类组件的效果。',
      },
    ],
  },
  {
    name: '尺寸',
    nameEn: 'Size',
    desc: '',
    descEn: '',
    groups: [],
  },
  {
    name: '其他',
    nameEn: 'Others',
    desc: '',
    descEn: '',
    groups: [],
  },
];

export default category;
