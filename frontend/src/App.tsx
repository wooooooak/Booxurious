import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    marign: 0;
    background-color: black;
  }
`;

class App extends React.Component {
  public render () {
    return (
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    );
  }
}

export default App;
