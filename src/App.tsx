import AppProvider from './contexts/app';
import RootNavigation from './navigation/RootNavigation';

const App = (): JSX.Element => (
  <AppProvider>
    <RootNavigation />
  </AppProvider>
);

export default App;
