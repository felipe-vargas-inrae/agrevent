const kafka = require('kafka-node');
//const bp = require('body-parser');
const config = require('./config');

module.exports.sendDataToBroker= function(data,topic){
    try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient({kafkaHost: config.kafka_server});
    const producer = new Producer(client);
    const kafka_topic=  topic//config.kafka_topic;
    const kafka_message = 'I am since nodejs';

    //const complexMessage= JSON.stringify({hola:'callado', felipe:'felipe'})
    console.log(kafka_message);
    let payloads = [
        {
        topic: kafka_topic,
        messages: data
        }
    ];

    producer.on('ready', async function() {
        let push_status = producer.send(payloads, (err, data) => {
        if (err) {
            console.log('[kafka-producer -> '+kafka_message+']: broker update failed');
        } else {
            console.log('[kafka-producer -> '+kafka_message+']: broker update success');
        }
        });
    });

    producer.on('error', function(err) {
        console.log(err);
        console.log('[kafka-producer -> '+kafka_message+']: connection errored');
        throw err;
    });
    }
    catch(e) {
    console.log(e);
    }
}