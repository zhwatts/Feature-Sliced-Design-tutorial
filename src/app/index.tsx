import React from 'react';
import {Routing} from 'pages';
import {withProviders} from './providers';
import './index.scss';

// eslint-disable-next-line react-refresh/only-export-components
const App: React.FC = () => {
  return (
    <div className="app">
      <Routing />
    </div>
  );
};

const appProviderContext = withProviders(App);

export default appProviderContext;
