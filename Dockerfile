FROM ruby:2.1-slim
RUN apt-get update && apt-get install -y build-essential libpq-dev && apt-get install -y nodejs
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:nginx/stable
RUN apt-get install -y nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install --without development test
COPY . /app
RUN cd app/ && RAILS_ENV=production bundle exec rake assets:precompile
ADD nginx-sites.conf /etc/nginx/sites-enabled/default

