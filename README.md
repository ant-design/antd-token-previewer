# antd-token-previewer 🖥

## Live Demo

https://ant-design.github.io/antd-token-previewer/

## Install

```
npm i antd-token-previewer
```

## Usage

Ref: https://ant-design.github.io/antd-token-previewer/editor

## API

### ThemeEditor

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| theme | Controlled Theme object | `Theme` | - |
| onThemeChange | Callback when `theme` changed | `(theme: Theme) => void` | - |
| locale | Language used in ThemeEditor | `Locale` | `zhCN` |
| actions | Actions displayed on the right of header | `React.ReactNode` | - |
| advanced | Advance mode | `boolean` | - |
| onAdvancedChange | Callback when `advanced` change | `(advanced: booleaen) => void` | - |

### Theme

| Property | Description | Type |
| --- | --- | --- |
| name | Name of Theme | `string` |
| key | Used as `key` for ReactElement | `string` |
| config | Theme config of antd | `ThemeConfig` |


## Development

```
npm install
npm start
```

## License

antd-token-previewer is released under the MIT license.
