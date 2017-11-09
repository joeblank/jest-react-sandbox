const fns = require('./../utils/functions');

describe('Async call for car data', function() {
    test('Axios call for cars', function() {
        expect.assertions(1);
        return fns.fetchCars('http://localhost:3001/api/cars').then(data => {
            expect(data[0].id).toBe(1)
        })
    })
})