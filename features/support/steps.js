const { Given, When, Then } = require('cucumber')
const supertest = require('supertest');
const { expect } = require("chai");
const config = require("../support/config");


Given('User register a weather station without an api key and validates error message', async () => {
    let request = supertest(config.preProd.url)
    const response = await request.post('/data/3.0/stations?appid=')
        .send({
            external_id: 'SF_TEST001',
            name: 'San Francisco Test Station',
            latitude: 37.76,
            longitude: -122.43,
            altitude: 150,
        })
        .set('Accept', 'application/json')
        expect(response.status).to.equal(401)
        expect(response.body.message).to.equal('Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.')
        expect(response.body).to.have.keys('code', 'message');

});

Given('User register a weather station with a valid api key and id DEMO_TEST001', async () => {
    let request = supertest(config.preProd.url)
    const response = await request.post(`/data/3.0/stations?appid=${config.preProd.apiKey2}`)
        .send({
            external_id: 'DEMO_TEST001',
            name: 'Team Demo Test Station 001',
            latitude: 33.33,
            longitude: -122.43,
            altitude: 222,
        })
        .set('Accept', 'application/json')
        expect(response.status).to.equal(201)
        expect(response.body.external_id).to.equal('DEMO_TEST001')
});

Given('User register a weather station with a valid api key and id DEMO_TEST002', async () => {
    let request = supertest(config.preProd.url)
    const response = await request.post(`/data/3.0/stations?appid=${config.preProd.apiKey2}`)
        .send({
            external_id: 'DEMO_TEST002',
            name: 'Team Demo Test Station 002',
            latitude: 44.44,
            longitude: -122.44,
            altitude: 111,
        })
        .set('Accept', 'application/json')
        expect(response.status).to.equal(201)
        expect(response.body.external_id).to.equal('DEMO_TEST002')
});

Given('User retrieves registered stations and verify the data to be correct', async () => {
    let request = supertest(config.preProd.url)
    const response = await request.get(`/data/3.0/stations?appid=${config.preProd.apiKey2}`)
        .set('Accept', 'application/json')
        expect(response.status).to.equal(200)
        const length = response.body.length

        expect(response.body[length-2].external_id).to.equal('DEMO_TEST001')
        expect(response.body[length-2].name).to.equal('Team Demo Test Station 001')
        expect(response.body[length-2].longitude).to.equal(-122.43)
        expect(response.body[length-2].latitude).to.equal(33.33)
        expect(response.body[length-2].altitude).to.equal(222)

        expect(response.body[length-1].external_id).to.equal('DEMO_TEST002')
        expect(response.body[length-1].name).to.equal('Team Demo Test Station 002')
        expect(response.body[length-1].longitude).to.equal(-122.44)
        expect(response.body[length-1].latitude).to.equal(44.44)
        expect(response.body[length-1].altitude).to.equal(111)

       
});