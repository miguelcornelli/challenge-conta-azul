import { render } from '@testing-library/react';
import App from './App';

test('Verificar se renderizou o component WeatherPage', () => {
  const rendered = render(<App />);
  const weatherPage = rendered.container.querySelector('weather-page');
  expect(weatherPage).toBeInTheDocument();
});
