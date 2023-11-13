#!/bin/bash

sleep 15

php artisan cache:clear
php artisan config:clear
php artisan migrate
php artisan db:seed

php artisan serve --host=0.0.0.0 --port=8000
