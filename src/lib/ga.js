import ReactGA from 'react-ga4';

const { REACT_APP_GA_TRACKING } = process.env;

class Ga {
  init() {
    ReactGA.initialize(REACT_APP_GA_TRACKING);
  }

  pageView(page) {
    ReactGA.send({ hitType: 'pageview', page });
  }

  event(name, data) {
    ReactGA.event(name, data);
  }
}

export const ga = new Ga();
