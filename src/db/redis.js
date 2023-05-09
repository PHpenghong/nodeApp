const redis = require('redis')

const client = redis.createClient({
  url: `redis://${process.env.REDIS_CONFIG_USER}:${
    process.env.REDIS_CONFIG_PWD
  }@${process.env.REDIS_CONFIG_HOST || '172.0.0.1'}:${
    process.env.REDIS_CONFIG_PORT || '6379'
  }`
})

client.on('connect', () => {
  console.log('redis connect')
})

client.on('error', function (err) {
  console.log('redis Error ' + err)
})

client.connect()

module.exports = client
