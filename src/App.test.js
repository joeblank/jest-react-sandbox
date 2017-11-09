const fns = require('./utils/functions');
const cars = require('./../server/carData.json')

describe('Car tests', () => {
    test('getCars returned car fax', () => {
        expect.assertions(1);
        const url = 'http://localhost:3001/api/cars'
        return fns.getCars(url).then( res => {
            expect(res[0].color).toEqual('Yellow');
        })
    })
    
    test('filterById will return correct car', () => {
        let carToCheck = fns.filterById(cars, 5);
        expect(carToCheck[0].id).toEqual(5);
    })
    test('filterByColor will filter by given color', function() {
        let result = fns.filterByColor(cars, 'Blue')
        let correctColor = true;
        result.map( car => {
            if(car.color !== 'Blue') {
                correctColor = false
            }
        })
        expect(correctColor).toBe(true)
    })
})
describe('Number Generator', () => {
    test('Random num should be between 0 and 10', function() {
        expect(fns.genRandomNum()).toBeGreaterThan(0)
        expect(fns.genRandomNum()).toBeGreaterThan(0)
        expect(fns.genRandomNum()).toBeGreaterThan(0)
        expect(fns.genRandomNum()).toBeGreaterThan(0)
        expect(fns.genRandomNum()).toBeGreaterThan(0)
        expect(fns.genRandomNum()).toBeLessThan(11)
        expect(fns.genRandomNum()).toBeLessThan(11)
        expect(fns.genRandomNum()).toBeLessThan(11)
        expect(fns.genRandomNum()).toBeLessThan(11)
        expect(fns.genRandomNum()).toBeLessThan(11)
    })
})
describe('Elf/Orc tests', function() {
    test('Elf should win with better stats', function() {
        expect(fns.findWinner(100,50,200,5)).toBe('Elf')
    })
    test('Orc should win with better stats', function() {
        expect(fns.findWinner(10,5,20,51)).toBe('Orc')
    })
})