const app = require('express')();
const mqtt = require('mqtt')

const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

let topic = 'last location';

client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Location sended to server '${topic}'`)
  })
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

client.on('connect', () => {
    client.publish(topic, 'received', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
      


app.listen(3000,()=>{
    console.log('Server is running at Port Number 3000');
});