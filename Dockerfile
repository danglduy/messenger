FROM ruby:3.1.2

RUN apt-get update -qq && apt-get install -y postgresql-client curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -yq nodejs
RUN npm i -g yarn

SHELL ["/bin/bash", "-eo", "pipefail", "-c"]

ENV APP_ROOT=/app
RUN mkdir ${APP_ROOT}

ENV GEM_HOME=${APP_ROOT}/vendor/bundle
ENV BUNDLE_PATH=${GEM_HOME} \
  BUNDLE_BIN=${GEM_HOME}/bin \
  BUNDLE_APP_CONFIG=${GEM_HOME}

ENV PATH=${APP_ROOT}/bin:${APP_ROOT}/vendor/bundle/bin:${PATH}

WORKDIR ${APP_ROOT}

COPY Gemfile Gemfile.lock ${APP_ROOT}/
COPY vendor ${APP_ROOT}/vendor

RUN gem install bundler:2.3.19 && gem install foreman
RUN echo "gem: --no-rdoc --no-ri" > ~/.gemrc
RUN bundle install

COPY package.json yarn.lock ${APP_ROOT}/
RUN yarn install

EXPOSE 3000

CMD ["./entrypoint.sh"]
