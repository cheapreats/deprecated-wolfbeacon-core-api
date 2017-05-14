#!/usr/bin/env bash

git pull --rebase upstream master # pull from wolfbeacon/wolfbeacon-core-api
sudo docker build -t wolfbeacon-core-api .
sudo docker run wolfbeacon-core-api
