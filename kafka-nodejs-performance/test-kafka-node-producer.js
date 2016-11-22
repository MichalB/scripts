// Setup
// bin/kafka-topics.sh --zookeeper zk01.eu-w1.aws.vpn:2181 --create --topic test-rep-one --partitions 6 --replication-factor 1

const async = require('async')
const {Client, Producer} = require('kafka-node')
const client = new Client('zk01.eu-w1.aws.vpn:2181,zk02.eu-w1.aws.vpn:2181,zk03.eu-w1.aws.vpn:2181')
const producer = new Producer(client, { partitionerType: 3 })

producer.on('ready', function () {
    async.timesLimit(1000000, 1000, function (n, next) {
        payload = {
            topic: 'test-rep-one',
            messages: 'Hello! #' + n,
            key: Math.random().toString(36).substring(7),
        }
        producer.send([payload], next)
    }, function () { client.close() })
});

producer.on('error', console.log())

