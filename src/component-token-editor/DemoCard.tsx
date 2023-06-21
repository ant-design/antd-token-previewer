import { Card, ConfigProvider, Divider, Tag, theme } from 'antd';
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
    <Card>
      <ConfigProvider
        theme={{
          token: tokenOverride,
        }}
      >
        {item.demo}
      </ConfigProvider>
      {shownTokens.length > 0 && (
        <>
          <Divider />
          <div style={{ color: token.colorTextDescription, marginBottom: 12 }}>
            {locale.demo.relatedTokensDescription}
          </div>
          {shownTokens.map((t) => (
            <Tag
              bordered={false}
              key={t}
              onClick={toggle(t)}
              color={selectedTokens.includes(t) ? 'blue' : undefined}
              style={{ cursor: 'pointer' }}
            >
              {t}
            </Tag>
          ))}
        </>
      )}
    </Card>
  );
};

export default DemoCard;
