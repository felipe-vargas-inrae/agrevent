const { Kafka } = require('kafkajs')
const experimentsModel= require('../db/models/experiments')
const config= require('./config')


const kafka = new Kafka({
    brokers: [config.kafka_server]
})

module.exports.run =  async() => {
    const consumer = kafka.consumer({ groupId: 'my-group' })
    await consumer.connect()
    // Subscribe can be called several times

    // EXPERIMENTS
    await consumer.subscribe({ topic: config.topics[0] })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            //console.log(topic, partition, message.value.toString())
            
            const jsonArray= JSON.parse(message.value.toString())
            experimentsModel.insertMany(jsonArray).then(()=>{console.log("agrevent inserted")}).catch(()=>{
                console.error("error in insert many")
            })
        },
    })
}



