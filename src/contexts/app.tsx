import { ReactNode } from 'react';
import { Provider } from 'react-redux';

// import Toast from '~/components/common/Toast/Toast';
import { store } from '~/store';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => (
  <Provider store={store}>
    {children}
    {/* <Toast /> */}
  </Provider>
);

export default AppProvider;
