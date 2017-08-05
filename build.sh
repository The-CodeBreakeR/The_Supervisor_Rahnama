#!/bin/bash

cd $(dirname $0)
cd client
npm run build
cd ..
./manage.py collectstatic
