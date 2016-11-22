
# Create a topic
bin/kafka-topics.sh --zookeeper zk01.eu-w1.aws.vpn:2181 --topic test --create --replication-factor 2 --partitions 8

# Info about topic
bin/kafka-topics.sh --zookeeper zk01.eu-w1.aws.vpn:2181 --topic test --describe

# Rebalance topics after server restart
# https://blog.imaginea.com/how-to-rebalance-topics-in-kafka-cluster/
bin/kafka-preferred-replica-election.sh --zookeeper zk01.eu-w1.aws.vpn:2181
