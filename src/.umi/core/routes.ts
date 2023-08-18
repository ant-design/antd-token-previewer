// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/bytedance/dev/antd/antd-token-previewer/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/bytedance/dev/antd/antd-token-previewer/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/bytedance/dev/antd/antd-token-previewer/node_modules/@umijs/preset-dumi/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1682663679000,
          "slugs": [
            {
              "depth": 1,
              "value": "antd-token-previewer 🖥",
              "heading": "antd-token-previewer-"
            },
            {
              "depth": 2,
              "value": "Live Demo",
              "heading": "live-demo"
            },
            {
              "depth": 2,
              "value": "Install",
              "heading": "install"
            },
            {
              "depth": 2,
              "value": "Usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "ThemeEditor",
              "heading": "themeeditor"
            },
            {
              "depth": 3,
              "value": "Theme",
              "heading": "theme"
            },
            {
              "depth": 2,
              "value": "Development",
              "heading": "development"
            },
            {
              "depth": 2,
              "value": "License",
              "heading": "license"
            }
          ],
          "title": "Index"
        },
        "title": "Index - antd-token-previewer"
      },
      {
        "path": "/editor",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/editor/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/editor/index.md",
          "updatedTime": 1682663679000,
          "slugs": [
            {
              "depth": 1,
              "value": "Theme Editor",
              "heading": "theme-editor"
            }
          ],
          "title": "Theme Editor",
          "hasPreviewer": true,
          "group": {
            "path": "/editor",
            "title": "Editor"
          }
        },
        "title": "Theme Editor - antd-token-previewer"
      },
      {
        "path": "/editor/v4-theme",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/editor/v4-theme.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/editor/v4-theme.md",
          "updatedTime": 1669819062000,
          "slugs": [
            {
              "depth": 1,
              "value": "V4 Theme",
              "heading": "v4-theme"
            }
          ],
          "title": "V4 Theme",
          "hasPreviewer": true,
          "group": {
            "path": "/editor",
            "title": "Editor"
          }
        },
        "title": "V4 Theme - antd-token-previewer"
      },
      {
        "path": "/others/color-panel",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/others/color-panel.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/others/color-panel.md",
          "updatedTime": 1669819062000,
          "slugs": [
            {
              "depth": 1,
              "value": "Color Panel",
              "heading": "color-panel"
            }
          ],
          "title": "Color Panel",
          "hasPreviewer": true,
          "group": {
            "path": "/others",
            "title": "Others"
          }
        },
        "title": "Color Panel - antd-token-previewer"
      },
      {
        "path": "/others/overview",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/others/overview.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/others/overview.md",
          "updatedTime": 1670501824000,
          "slugs": [
            {
              "depth": 1,
              "value": "总览组件",
              "heading": "总览组件"
            },
            {
              "depth": 2,
              "value": "主色",
              "heading": "主色"
            },
            {
              "depth": 2,
              "value": "成功色",
              "heading": "成功色"
            },
            {
              "depth": 2,
              "value": "警戒色",
              "heading": "警戒色"
            },
            {
              "depth": 2,
              "value": "失败色",
              "heading": "失败色"
            },
            {
              "depth": 2,
              "value": "聚合",
              "heading": "聚合"
            }
          ],
          "title": "总览组件",
          "hasPreviewer": true,
          "group": {
            "path": "/others",
            "title": "Others"
          }
        },
        "title": "总览组件 - antd-token-previewer"
      },
      {
        "path": "/previewer/controlled",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/previewer/controlled.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/previewer/controlled.md",
          "updatedTime": 1669819062000,
          "slugs": [
            {
              "depth": 1,
              "value": "Previewer Controlled",
              "heading": "previewer-controlled"
            }
          ],
          "title": "Previewer Controlled",
          "hasPreviewer": true,
          "group": {
            "path": "/previewer",
            "title": "Previewer"
          }
        },
        "title": "Previewer Controlled - antd-token-previewer"
      },
      {
        "path": "/previewer",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/previewer/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/previewer/index.md",
          "updatedTime": 1669819062000,
          "slugs": [
            {
              "depth": 1,
              "value": "Previewer",
              "heading": "previewer"
            }
          ],
          "title": "Previewer",
          "hasPreviewer": true,
          "group": {
            "path": "/previewer",
            "title": "Previewer"
          }
        },
        "title": "Previewer - antd-token-previewer"
      },
      {
        "path": "/previewer/previewer-token-panel",
        "component": require('/Users/bytedance/dev/antd/antd-token-previewer/docs/previewer/previewer-token-panel.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/previewer/previewer-token-panel.md",
          "updatedTime": 1669819062000,
          "slugs": [
            {
              "depth": 1,
              "value": "Previewer Token Panel",
              "heading": "previewer-token-panel"
            }
          ],
          "title": "Previewer Token Panel",
          "hasPreviewer": true,
          "group": {
            "path": "/previewer",
            "title": "Previewer"
          }
        },
        "title": "Previewer Token Panel - antd-token-previewer"
      },
      {
        "path": "/others",
        "meta": {},
        "exact": true,
        "redirect": "/others/color-panel"
      }
    ],
    "title": "antd-token-previewer",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
