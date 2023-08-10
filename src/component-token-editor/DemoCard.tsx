import { Card, ConfigProvider, Tag, theme } from 'antd';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import type { ComponentDemo } from '../interface';
import { useLocale } from '../locale';
import { HIGHLIGHT_COLOR } from '../utils/constants';

export interface DemoCardProps {
  demo: ComponentDemo;
}

const DemoCard: FC<DemoCardProps> = ({ demo: item }) => {
  const { token } = theme.useToken();
  const locale = useLocale();

  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const toggle = (targetToken: string) => () => {
    setSelectedTokens((prev) => {
      return prev.includes(targetToken)
        ? prev.filter((t) => t !== targetToken)
        : [...prev, targetToken];
    });
  };

  const tokenOverride = useMemo(() => {
    return selectedTokens.reduce<any>((result, t) => {
      result[t] = HIGHLIGHT_COLOR;
      return result;
    }, {});
  }, [selectedTokens]);

  const shownTokens = useMemo(() => {
    return item.tokens?.filter((t) => t.toLowerCase().includes('color')) ?? [];
  }, [item.tokens]);

  return (
    <Card
      bodyStyle={{
        padding: 0,
      }}
    >
      <div style={{ padding: 20 }}>
        <ConfigProvider
          theme={{
            token: tokenOverride,
          }}
        >
          {item.demo}
        </ConfigProvider>
      </div>
      {shownTokens.length > 0 && (
        <div
          style={{
            background: token.colorFillQuaternary,
            padding: '12px 20px 20px',
            borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
            boxShadow: 'inset 0 2px 4px 0 rgba(25,15,15,0.07)',
          }}
        >
          <div style={{ color: token.colorTextDescription, marginBottom: 12 }}>
            {locale.demo.relatedTokensDescription}
          </div>
          {shownTokens.map((t) => (
            <Tag
              bordered={false}
              key={t}
              onClick={toggle(t)}
              color={selectedTokens.includes(t) ? 'blue' : undefined}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              {t}
            </Tag>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DemoCard;
