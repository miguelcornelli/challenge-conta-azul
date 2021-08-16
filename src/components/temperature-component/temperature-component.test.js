import { render, screen } from '@testing-library/react';
import TemperatureComponent from './temperature-component';
import Moment from 'moment';

test('check infromation basics', () => {
  const moment = Moment();
  const rendered = render(<TemperatureComponent title="test" temperature="33" updatedAt={moment} />);
  const title = screen.getByText(/test/i);
  expect(title).toBeInTheDocument();
  
  const temperature = screen.getByText(/33/i);
  expect(temperature).toBeInTheDocument();

  const updatedAt = screen.getByText(/Updated at /i);
  expect(updatedAt).toBeInTheDocument();
});

test('check information', () => {
  const moment = Moment();
  const rendered = render(<TemperatureComponent title="test" temperature="33" humidity="95" pressure="1023" updatedAt={moment} />);
  const title = screen.getByText(/test/i);
  expect(title).toBeInTheDocument();
  
  const humidity = screen.getByText(/95/i);
  expect(humidity).toBeInTheDocument();
  
  const pressure = screen.getByText(/1023/i);
  expect(pressure).toBeInTheDocument();
  
  const temperature = screen.getByText(/33/i);
  expect(temperature).toBeInTheDocument();

  const updatedAt = screen.getByText(/Updated at /i);
  expect(updatedAt).toBeInTheDocument();
});

test('check button try again', () => {  
  const rendered = render(<TemperatureComponent retryCallback={()=>{}} />);
  const buttonRetry = rendered.container.querySelector('button');
  expect(buttonRetry).toBeInTheDocument();
});

test('loading card', () => {  
  const rendered = render(<TemperatureComponent />);
  const loadingDiv = rendered.container.querySelector('div.loading');
  expect(loadingDiv).toBeInTheDocument();
});