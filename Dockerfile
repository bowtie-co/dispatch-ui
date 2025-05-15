####################################################
# Base node image for dev + builder
####################################################
FROM node:18-alpine AS dev

LABEL maintainer="Charlie McClung <charlie@bowtie.co>"

ENV BASE_DIR=/app
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV GENERATE_SOURCEMAP=false

RUN mkdir -p ${BASE_DIR} && \
    npm i -g npm && \
    apk add --no-cache git openssh curl bash

WORKDIR ${BASE_DIR}

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD [ "npm", "start" ]


####################################################
# run builder from dev for both staging & production
####################################################
FROM dev AS builder

LABEL maintainer="Charlie McClung <charlie@bowtie.co>"

ENV BUILD_DIR=/build

RUN mkdir -p ${BUILD_DIR}

RUN [ ! -d src/maintenance ] || cp -r src/maintenance ${BUILD_DIR}/maintenance
# RUN export $(cat .env.development | xargs) && npm run build && mv build ${BUILD_DIR}/development
RUN export $(cat .env.staging | xargs) &&  npm run build && mv build ${BUILD_DIR}/staging
RUN export $(cat .env.production | xargs) && npm run build && mv build ${BUILD_DIR}/production


####################################################
# run staging/production environment (based on ENV)
####################################################
FROM nginx:alpine

LABEL maintainer="Charlie McClung <charlie@bowtie.co>"

ENV BUILD_DIR=/build

RUN rm -rf /etc/nginx/conf.d && \
    apk add --no-cache bash

COPY nginx-entrypoint.sh /
COPY nginx /etc/nginx
COPY --from=builder ${BUILD_DIR} ${BUILD_DIR}

EXPOSE 80

ENTRYPOINT [ "/nginx-entrypoint.sh" ]

CMD ["nginx", "-g", "daemon off;"]
