const { Kafka } = require('kafkajs')

const config= require('./config')

const kafka = new Kafka({
    brokers: [config.kafka_server]
})

const producer = kafka.producer()

const run= async ()=>{
    await producer.connect()
}
run()
module.exports.sendDataToBroker=async(listData,topic)=>{
    
    listData=listData.map((item)=>{ return {value:JSON.stringify(item)}});

    await producer.send({
        topic: topic,
        messages: listData
    })
    console.log("message sent kafka broker")
}