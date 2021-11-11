import React from 'react'
import * as r9 from '@risk9/api';

const ApiContext = React.createContext<r9.AssetApi | null>(null);
export const ApiProvider = ApiContext.Provider
export default ApiContext