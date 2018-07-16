import * as React from 'react';
import * as rebass from 'rebass';

class App extends React.Component {
  public render () {
    return (
      <rebass.Provider>
        <rebass.Card backgroundColor="black">
          <rebass.Subhead p={2}>Hello</rebass.Subhead>
        </rebass.Card>
      </rebass.Provider>
    );
  }
}

export default App;
