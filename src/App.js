import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      carById: {},
      carsByColor: [],
      colors: ['Select color','Orange', 'Blue', 'Green', 'Purple', 'Yellow'],
      checked: true,
      randomNum: null,
      winner: ''
    }
    this.filterCarsById = this.filterCarsById.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.filterByColor = this.filterByColor.bind(this);
    this.randomNum = this.randomNum.bind(this);
    this.battle = this.battle.bind(this);
  }

  componentDidMount() {
    axios.get('/api/cars').then( data => {
      this.setState({
        cars: data.data
      })
    })
  }

  filterCarsById() {
    console.log('running')
    const car = this.state.cars.filter( car => {
      return car.id === parseInt(this.input.value)
    })
    console.log(car)
    this.setState({
      carById: car
    })
  }

  filterByColor(e) {
    const cars = this.state.cars.filter( car => {
      return car.color === e.target.value
    })
    this.setState({
      carsByColor: cars
    })
  }

  randomNum() {
    this.setState({
      randomNum: Math.floor(Math.random() * 10) + 1
    })
  }

  battle() {
    console.log('running')
    let elfHealth = parseInt(this.elfH.value);
    let elfAttack = parseInt(this.elfA.value);
    let orcAttack = parseInt(this.orcA.value);
    let orcHealth = parseInt(this.orcH.value);
    while(elfHealth > 0 || orcHealth > 0) {
      console.log('elf', elfHealth, 'orc', orcHealth)
      orcHealth -= elfAttack;
      if (orcHealth<= 0) {
        this.setState({
          winner: 'Elf'
        })
        return;
      }
      elfHealth -= orcAttack;
      if (elfHealth <= 0) {
        this.setState({
          winner: 'Orc'
        })
        return;
      }
    }
  }
  
  toggleCheck() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    const options = this.state.colors.map( (color) => {
      return <option key={color} value={color}>{color}</option>
    })
    return (
      <div className="App">
        <h1>Car Inventory</h1>
        <h3>Car Data:</h3>
        <p>Show/hide 
          <input 
            onChange={this.toggleCheck} 
            checked={this.state.checked} 
            type='checkbox'
          />
        </p>
        {this.state.checked ? 
          JSON.stringify(this.state.cars, null, 2) : 'Car data hidden.'}
        <hr/>  
        <h3>Filter cars by ID</h3>
        <input 
          ref={(input)=> this.input = input}
          placeholder='Enter a number 1 - 25'
          onChange={({target}) => this.setState({inputValue: target.value})} 
        />
        <button onClick={this.filterCarsById}>Get car</button><br/><br/>
        {this.state.carById.length === 0 ?
           'No car selected.'
           :
           JSON.stringify(this.state.carById, null, 2)}
        <hr/>

        <h3>Filter cars by color:</h3>
        <select onChange={this.filterByColor}>
          { options }
        </select><br/><br/> 
        {this.state.carsByColor.length === 0 ?
          'No cars to show.'
          :
          JSON.stringify(this.state.carsByColor, null, 2)}
        <hr />
        <h1>Random number generator</h1>
        <button onClick={this.randomNum}>1 - 10</button>
        <p>Random number: {this.state.randomNum}</p>
        <hr />
        <h1>Battle</h1>
        <p>Elf atttack: <input ref={(elfA)=> this.elfA = elfA} type='number'/></p>
        <p>Elf health: <input ref={(elfH)=> this.elfH = elfH} type='number'/></p>
        <p>Orc atttack: <input ref={(orcA)=> this.orcA = orcA} type='number'/></p>
        <p>Orc health: <input ref={(orcH)=> this.orcH = orcH} type='number'/></p>
        <button onClick={this.battle}>Attack</button>
        <p>Result: {this.state.winner}</p>
      </div>
    );
  }
}

export default App;
