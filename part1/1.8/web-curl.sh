#!/bin/bash
echo "Input website:"
read web
echo "Searching.."
sleep 1
curl http://$web

