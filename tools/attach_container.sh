#!/bin/bash

echo 'Input container name'
read NAMECONTAINER
sudo docker-compose exec $NAMECONTAINER bash
