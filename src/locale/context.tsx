import React from 'react';
import { zhCN } from './index';
import type { Locale } from './interface';

export const LocaleContext = React.createContext<Locale>(zhCN);

export const useLocale = () => React.useContext(LocaleContext);
