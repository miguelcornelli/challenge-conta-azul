import WeatherService from './weather-service';

test('Verifica retorno do metodo getWeatherOfCity', async () => {
  const weatherService = new WeatherService();
  const data = await weatherService.getWeatherOfCity(184742);

  expect(data.main.temp !== undefined).toEqual(true);
  expect(data.main.humidity !== undefined).toEqual(true);
  expect(data.main.pressure !== undefined).toEqual(true);
});
