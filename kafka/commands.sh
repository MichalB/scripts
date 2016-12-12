#!/usr/bin/env bash

# Create a topic
/opt/kafka/bin/kafka-topics.sh --zookeeper zk01:2181 --create --topic test --replication-factor 2 --partitions 8

# Info about topic
/opt/kafka/bin/kafka-topics.sh --zookeeper zk01:2181 --describe --topic test

# Read topics list
/opt/kafka/bin/kafka-topics.sh --zookeeper zk01:2181 --list

# Rebalance topics after server restart
# https://blog.imaginea.com/how-to-rebalance-topics-in-kafka-cluster/
/opt/kafka/bin/kafka-preferred-replica-election.sh --zookeeper zk01:2181
