const axios = require('axios');

module.exports = {
    fetchCars(url) {
        return axios.get(url).then( res => {
            return res.data
        })
    },
    filterById(cars, id) {
        return cars.filter(car => {
            return car.id === parseInt(id);
        })
    }
}
