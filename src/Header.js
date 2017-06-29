import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {
  constructor() {
    super();
    
    //Initial State
    this.state = {
      txtButton1: 'Name',
      txtButton2: 'Coord',
      classActiveIcon1: 'active',
      classActiveIcon2: 'inactive',
      txtConditionSearch: 'name',
      txtSearch: '',
      mainTemp: 'Temperature',
      weatherDescription: 'Description',
      mainTempMin : '-',
      mainTempMax : '-',
      sysSunrise: '-',
      sysSunset: '-',
    }
  }

  handleClickTypeButton1() {
    this.setState({
      classActiveIcon1: 'active',
      classActiveIcon2: 'inactive',
      txtConditionSearch: 'name'
    })
  }
  
  handleClickTypeButton2() {
    this.setState({
      classActiveIcon1: 'inactive',
      classActiveIcon2: 'active',
      txtConditionSearch: 'coord'
    })
  }

  handleChangeTextSearch(e) {
    this.setState({
      txtSearch: e.target.value
    });
  }

  handleClickSearch() {
    return axios.get('./CityList.json')
            .then(
              response => this.getCityId(response)
            )
            .catch(function (error) {
              console.log(error);
            });
  }

  getCityId(response) {
    for (let i = 0; i < response.data.length; i++) {
      if (this.state.txtConditionSearch === 'name') {
        if (response.data[i].name === this.state.txtSearch) {
          this.getCityDetail(response.data[i].id);
        }
      }
      else if (this.state.txtConditionSearch === 'coord') {
        let splitLatLon = this.state.txtSearch.split(',');
        if (response[i].data.coord.lat === splitLatLon[0] && response.data[i].coord.lon === splitLatLon[1]) {
          this.getCityDetail(response.data[i].id);
        }
      }
    }
  }

  getCityDetail(cityId) {
    return axios.get('http://api.openweathermap.org/data/2.5/weather?id='+cityId+'&APPID=938beb6f4eafa00a4b7835ae3653db46&units=metric')
            .then(
              response => this.putInformation(response)
            )
            .catch(function (error) {
              console.log(error);
            });
  }

  putInformation(response) {
    let information = response.data;
    console.log(information);
    this.setState({
      weatherIcon: 'http://openweathermap.org/img/w/'+information.weather[0].icon+'.png',
      mainTemp: information.main.temp + ' °C',
      weatherDescription: information.weather[0].description,
      mainTempMin : information.main.temp_min + ' °C',
      mainTempMax : information.main.temp_max + ' °C',
      sysSunrise: new Date(information.sys.sunrise*1000).toString(),
      sysSunset: new Date(information.sys.sunset*1000).toString()
    })
  }

  render() {
    return (
      <div>
        <div className='App-header'>
          <div className='App-header1'>
            <button type='button' className='button-ghost' onClick={() => this.handleClickTypeButton1()}>
              {this.state.txtButton1} 
              <span className={this.state.classActiveIcon1}>
                <i className='fa fa-check' aria-hidden='true'></i>
              </span>
            </button>
          </div>
          <div className='App-header2'>
            <button type='button' className='button-ghost' onClick={() => this.handleClickTypeButton2()}>
              {this.state.txtButton2} 
              <span className={this.state.classActiveIcon2}>
                <i className='fa fa-check' aria-hidden='true'></i>
              </span>
            </button>
          </div>
          <div className='App-header3'>
            <input type='text' onChange={(e) => this.handleChangeTextSearch(e)} />
            <i className='fa fa-search' aria-hidden='true' onClick={() => this.handleClickSearch()}></i>
          </div>
        </div>
        <div className='App-content'>
          <div className='App-content1'>
            <img src={this.state.weatherIcon} /> <br /><br />
            {this.state.mainTemp} <br /><br />
            {this.state.weatherDescription}
          </div>
          <div className='App-content2'>
            <div className='App-content2-1'>
              <label>Min</label> <br /><br />
              {this.state.mainTempMin}
            </div>
            <div className='App-content2-2'>
              <label>Max</label> <br /><br />
              {this.state.mainTempMax}
            </div>
          </div>
          <div className='App-content3'>
            <div className='App-content3-1'>
              <label>Sun Rise:</label> {this.state.sysSunrise} <br /><br />
              <label>Sun Set:</label> {this.state.sysSunset}  
            </div>            
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
