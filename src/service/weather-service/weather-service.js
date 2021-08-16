import AbstractCacheService from '../abstract-cache-service';

export default class WeatherService extends AbstractCacheService {
  constructor(){
    super(15);
    const appid = "439d4b804bc8187953eb36d2a8c26a02";

    this.getWeatherOfCity = (cityId)=>{
      return this.get("https://openweathermap.org/data/2.5/weather?id="+cityId+"&appid="+appid);
    }
  }
}