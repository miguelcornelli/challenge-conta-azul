import React, {Component} from 'react';
import Moment from 'moment';
import TemperatureComponent from '../../components/temperature-component/temperature-component';
import WeatherService from '../../service/weather-service/weather-service'
import './weather-page.scss';

export default class WeatherPage extends Component {
  constructor(props){
    super(props);

    this.weatherService = new WeatherService();
    /*Previnir Memory Leak fazendo que não utilize setState
      quando component não estiver montado*/
    this.componentIsMount = true;
    
    this.state = {
      cityList: {
        "Urubici, BR": {
          id: 3445709,
          type: "complete",
          data: {}
        },
        "Nuuk, GL": {
          id: 3421319,
          type: "simple",
          data: {}
        },
        "Nairobi, KE": {
          id: 184742,
          type: "simple",
          data: {}
        }
      }
    }

    this.updateAllCity = ()=>{
      for (let city in this.state.cityList)
        this.updateCity(city);
    }

    this.updateCity = (city)=>{
      this.updateDataCity(city, {});
      let cityObj = this.state.cityList[city];
      this.weatherService.getWeatherOfCity(cityObj.id).then((data)=>{
        switch(cityObj.type){
          case('simple'):
            this.updateDataCity(city, this.convertStateSimpleCity(data));
            break;
          case('complete'):
          this.updateDataCity(city, this.convertStateCompleteCity(data));
            break;
          default:
            this.handleErroStateCity(city);
        }
      }).catch((error)=>{
        this.handleErroStateCity(city);
      });
    }

    this.updateDataCity = (city, value)=>{
      let cityList = {...this.state.cityList};
      cityList[city].data = value;
      if(this.componentIsMount){
        this.setState({cityList: cityList});   
      }
    }

    this.convertStateSimpleCity = (data)=>{
       return {
          temperature: Math.round(data.main.temp),
          updatedAt: Moment()
      }
    }
    
    this.convertStateCompleteCity = (data)=>{
      return {
        ...this.convertStateSimpleCity(data),
        ...{
          humidity: data.main.humidity,
          pressure: data.main.pressure,
        }
      }
    }

    this.handleErroStateCity = (city)=>{
      this.updateDataCity(city, {retryCallback: ()=>this.updateCity(city)});
    }
  }

  componentDidMount() {
    this.updateAllCity();
    
    //A cada 10 min consulta a lista de cidades novamente
    this.intervalUpdateCity = setInterval(()=>{this.updateAllCity()}, 600000);
  }

  componentWillUnmount() {
    this.componentIsMount = false;

    //Para o timer quando o component for desacoplado (desmontado)
    clearInterval(this.intervalUpdateCity);
  }

  render() {
    const { cityList } = this.state;
    return (
      <weather-page>
        {Object.keys(cityList).map((city, index)=>{
          let cityData = cityList[city];
          return <TemperatureComponent key={Math.random()}
            title={city}
            temperature={cityData.data.temperature}
            humidity={cityData.data.humidity}
            pressure={cityData.data.pressure}
            updatedAt={cityData.data.updatedAt}
            retryCallback={cityData.data.retryCallback}>
          </TemperatureComponent>
        })}
      </weather-page>
    );
  }

}
