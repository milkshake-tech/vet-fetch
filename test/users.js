const utils = require('./utils')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server/app')
const User = require('../server/user/User')
chai.use(chaiHttp)

describe('User Controller', () => {
  it('should GET ALL Users on /api/user', (done) => {
    User.create({
      email: 'frank.underwood@gmail.com',
    	phone: '(555) 123-5555',
    	password: '123',
    	image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/House_of_Cards.svg/2000px-House_of_Cards.svg.png'
    })

    chai.request(server)
    .get('/api/user')
    .auth('vetfetch', 'milkshake')
    .end((err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.confirmation.should.equal('Success')
      res.body.should.have.property('results')
      res.body.results.length.should.equal(1)
      res.body.results[0].email.should.equal('frank.underwood@gmail.com')
      res.body.results[0].phone.should.equal('(555) 123-5555')
      res.body.results[0].image.should.equal('https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/House_of_Cards.svg/2000px-House_of_Cards.svg.png')
      res.body.results[0].should.include.keys(
        'id', 'email', 'phone', 'timestamp', 'image'
      )
      done()
    })
  })
})
