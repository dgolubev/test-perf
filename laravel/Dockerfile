FROM php:cli

RUN apt-get update -y  \
    && apt-get install -y \
      libmcrypt-dev \
      default-mysql-client \
      default-libmysqlclient-dev  \
      unzip  \
    && rm -rf /var/lib/apt

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install mysqli pdo pdo_mysql

#RUN docker-php-ext-install pdo mbstring
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app
COPY . /app

RUN composer install

EXPOSE 8000

#RUN sleep 60

#CMD ["/var/www/docker/wait-for-it.sh", "app-db:3306", "--", "/var/www/docker/run.sh"]
#
#CMD php artisan migrate
#CMD php artisan db:seed
#
#CMD php artisan serve --host=0.0.0.0 --port=8000
