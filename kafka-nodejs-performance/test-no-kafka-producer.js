// Setup
// bin/kafka-topics.sh --zookeeper zk01.eu-w1.aws.vpn:2181 --create --topic test-rep-one --partitions 6 --replication-factor 1

var util = require('util');
var Kafka = require('no-kafka');
var async = require('async');

var Producer = Kafka.Producer;
var DefaultPartitioner = Kafka.DefaultPartitioner;

function MyPartitioner() {
    DefaultPartitioner.apply(this, arguments);
}

util.inherits(MyPartitioner, DefaultPartitioner);

MyPartitioner.prototype.getKey = function getKey(message) {
    return message.key;
};

var producer = new Producer({
    partitioner: new MyPartitioner()
});

producer.init().then(function () {
    async.timesLimit(1000000, 1000, function (n, next) {
        producer.send({
            topic: 'test-rep-one',
            message: {
                key: Math.random().toString(36).substring(7),
                value: 'Hello! #' + n
            }
        }).then(function () { next() });
    }, function () { process.exit(0) })
});

// 1.000.000 messages / 63 sec per nodeJS producer on 1 CPU
// Kafka on m4.large - 20% CPU / 10 nodeJS producers
