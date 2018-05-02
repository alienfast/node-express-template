FROM node:9.11-alpine

ENV OF_WATCHDOG_VERSION 0.2.3

# Alternatively use ADD https:// (which will not be cached by Docker builder)
RUN apk --no-cache add curl \
    && echo "Pulling watchdog binary from Github." \
    && curl -sSLf https://github.com/openfaas-incubator/of-watchdog/releases/download/${OF_WATCHDOG_VERSION}/of-watchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && apk del curl --no-cache

# Set correct permissions to use non root user
# chmod for tmp is for a buildkit issue (@alexellis)
ENV APP /home/app
RUN addgroup -S app && adduser -S -g app app \
    && mkdir -p ${APP} \
    && chown app:app -R ${APP} \
    && chmod 777 /tmp

USER app

ENV NPM_CONFIG_LOGLEVEL error
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > ${APP}/.npmrc

# Wrapper/boot-strapper
WORKDIR ${APP}
COPY package.json ./

# This ordering means the npm installation is cached for the outer function handler.
RUN npm i --production

# Copy outer function handler
COPY *.js ./

# COPY function node packages and install, adding this as a separate
# entry allows caching of npm install
RUN mkdir ${APP}/function
WORKDIR ${APP}/function
COPY function/*.json ./
RUN npm i --production

# COPY function files and folders
COPY function/ ./

WORKDIR ${APP}

ENV cgi_headers="true"
ENV fprocess="node index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="20s" 
ENV write_timeout="25s" 
ENV read_timeout="25s" 

HEALTHCHECK --interval=1s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]

