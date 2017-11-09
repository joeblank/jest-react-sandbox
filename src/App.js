import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import fns from './utils/functions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      carById: {},
      carsByColor: [],
      inputValue: null,
      colors: ['Orange', 'Blue', 'Green', 'Purple', 'Black', 'Yellow']
    }
    this.filterCarsById = this.filterCarsById.bind(this);
  }

  componentDidMount() {
    fns.fetchCars('/api/cars').then( data => {
      this.setState({
        cars: data
      })
    })
  }

  filterCarsById(e) {
    const id = this.state.inputValue;
    const car = fns.filterById(this.state.cars, id)
    this.setState({
      carById: car
    })
  }

  render() {
    const options = this.state.colors.map( (color) => {
      return <option value={color}>{color}</option>
    })
    return (
      <div className="App">
        <h1>Car Inventory</h1>
        <h3>Filter cars by ID</h3>
        <input 
          placeholder='Enter a number 1 - 50'
          onChange={({target}) => this.setState({inputValue: target.value})} 
        />
        <button onClick={this.filterCarsById}>Get car</button><br/><br/>
        {Object.keys(this.state.carById).length === 0 ?
           'No car selected.'
           :
           JSON.stringify(this.state.carById, null, 2)}
        <hr/>

        <h3>Filter cars by color:</h3>
        <select>
          { options }
        </select><br/><br/> 
        {this.state.carsByColor.length === 0 ?
          'No cars to show.'
          :
          JSON.stringify(this.state.carsByColor, null, 2)}
        <hr/>
        <h3>Car Data:</h3>
        {JSON.stringify(this.state.cars, null, 2)}
      </div>
    );
  }
}

export default App;
