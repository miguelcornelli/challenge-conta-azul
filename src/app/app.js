import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/header/header';
import WeatherPage from '../pages/weather-page/weather-page';
import './app.scss';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header></Header>
      <div className="App">
        <Switch>
          <Route exact path= "/" component={WeatherPage}/>
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
