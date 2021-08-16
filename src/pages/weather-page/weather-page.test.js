import { render } from '@testing-library/react';
import WeatherPage from './weather-page';

test('Verificar se há três cards de temperatura', () => {
  const rendered = render(<WeatherPage />);
  const TemperatureComponent = rendered.container.querySelectorAll('temperature-component');
  expect(TemperatureComponent.length === 3).toEqual(true);
});
