import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import type { ThemeConfig, UploadProps } from 'antd';
import { Button, message, Modal, Skeleton, Upload } from 'antd';
import type { FC } from 'react';
import React, { Suspense, useEffect, useState } from 'react';
import type { OnChange } from 'vanilla-jsoneditor';
import type { Theme } from '../interface';
import { useLocale } from '../locale';
import { parsePlainConfig, parseThemeConfig } from '../utils/parse-config';

const JSONEditor = React.lazy(() => import('./JSONEditor'));

export type EditorModalProps = {
  open?: boolean;
  onCancel?: () => void;
  onOk?: (theme: ThemeConfig) => void;
  theme: Theme;
};

const EditorModal: FC<EditorModalProps> = ({ open, onCancel, onOk, theme }) => {
  const locale = useLocale();
  const [messageApi, contextHolder] = message.useMessage();

  const [content, setContent] = useState<{
    text: string;
    json?: undefined;
  }>({
    text: JSON.stringify(parsePlainConfig(theme?.config), null, 2),
    json: undefined,
  });

  useEffect(() => {
    setContent({
      text: JSON.stringify(parsePlainConfig(theme?.config), null, 2),
    });
  }, [theme]);

  const [editThemeFormatRight, setEditThemeFormatRight] =
    useState<boolean>(true);
  const handleChange: OnChange = (newContent, preContent, status) => {
    setContent(newContent as { text: string });
    if (status?.contentErrors && Object.keys(status.contentErrors).length > 0) {
      setEditThemeFormatRight(false);
    } else {
      setEditThemeFormatRight(true);
    }
  };

  const handleDownload = () => {
    const file = new File([`${(content as any)?.text}`], `theme.json`, {
      type: 'text/json; charset=utf-8;',
    });
    const tmpLink = document.createElement('a');
    const objectUrl = URL.createObjectURL(file);

    tmpLink.href = objectUrl;
    tmpLink.download = file.name;
    document.body.appendChild(tmpLink);
    tmpLink.click();

    document.body.removeChild(tmpLink);
    URL.revokeObjectURL(objectUrl);
  };

  const handleOk = () => {
    if (!editThemeFormatRight) {
      messageApi.error('主题 JSON 格式错误');
      return;
    }
    onOk?.(parseThemeConfig(JSON.parse(content.text)));
  };

  const handleUpload: UploadProps['onChange'] = async ({ fileList }) => {
    const [file] = fileList;
    const json = await file.originFileObj?.text();
    setContent({ text: json! });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={locale.themeConfig}
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        width={800}
      >
        <Suspense fallback={<Skeleton />}>
          <JSONEditor
            content={content}
            onChange={handleChange}
            mainMenuBar={false}
          />
        </Suspense>
        <div style={{ marginBottom: -44, marginTop: 24 }}>
          <Upload
            customRequest={() => {}}
            maxCount={1}
            showUploadList={false}
            accept=".json"
            onChange={handleUpload}
          >
            <Button icon={<ImportOutlined />} style={{ marginRight: 8 }}>
              {locale.import}
            </Button>
          </Upload>
          <Button icon={<ExportOutlined />} onClick={handleDownload}>
            {locale.export}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditorModal;
