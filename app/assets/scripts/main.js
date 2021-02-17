import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { DevseedUiThemeProvider } from '@devseed-ui/theme-provider';
import { CollecticonsGlobalStyle } from '@devseed-ui/collecticons';

import history from './utils/history.js';

// Views
import Home from './components/home';
import About from './components/about';

// Root component.
function Root() {
  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner');
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }, []);

  return (
    <Router history={history}>
      <DevseedUiThemeProvider>
        <CollecticonsGlobalStyle />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </Switch>
      </DevseedUiThemeProvider>
    </Router>
  );
}
render(<Root />, document.querySelector('#app-container'));
