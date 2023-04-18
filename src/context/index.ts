import React from 'react';

type AdvancedType = boolean | undefined;

export const AdvancedContext = React.createContext<AdvancedType>(false);

export const useAdvanced = () => React.useContext(AdvancedContext);
