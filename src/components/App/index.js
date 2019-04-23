import React, { Component } from 'react';

import Shelf from '../Shelf';

import FloatCart from '../FloatCart';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Shelf />
        </main>
        <FloatCart />
      </React.Fragment>
    );
  }
}

export default App;
