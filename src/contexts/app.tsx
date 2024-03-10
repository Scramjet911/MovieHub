import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '~/store';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => (
  <Provider store={store}>{children}</Provider>
);

export default AppProvider;
