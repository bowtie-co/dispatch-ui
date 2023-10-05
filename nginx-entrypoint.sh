#!/bin/bash

set -e

APP_ENV=${APP_ENV:-staging}
APP_DIR=${BUILD_DIR}/${APP_ENV}
SRV_DIR=/usr/share/nginx/html

if [ ! -d ${APP_DIR} ]; then
  echo "Unable to location app dir: ${APP_DIR}"
  exit 1
fi

if [ -d ${SRV_DIR} ]; then
  echo "Found existing SRV_DIR: ${SRV_DIR}, removing it ..."
  rm -rf ${SRV_DIR}
fi

ln -s ${APP_DIR} ${SRV_DIR}

echo "SERVING FROM APP DIR: ${APP_DIR}"

inject_env() {
  f=$1

  if [ -f $f ]; then
    echo "Replace placeholders in file: $f"

    sed -i "s|PLACEHOLDER_REACT_APP_AIRBRAKE_ID|${REACT_APP_AIRBRAKE_ID}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_AIRBRAKE_KEY|${REACT_APP_AIRBRAKE_KEY}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_API_ROOT|${REACT_APP_API_ROOT}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_BASE_URL|${REACT_APP_BASE_URL}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_GA_TRACKING|${REACT_APP_GA_TRACKING}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_PUBNUB_PUBLISH_KEY|${REACT_APP_PUBNUB_PUBLISH_KEY}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_PUBNUB_SUBSCRIBE_KEY|${REACT_APP_PUBNUB_SUBSCRIBE_KEY}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_STORAGE_DRIVER|${REACT_APP_STORAGE_DRIVER}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_THEMES_MODE|${REACT_APP_THEMES_MODE}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_GOOGLE_FONTS_API_KEY|${REACT_APP_GOOGLE_FONTS_API_KEY}|g" "${f}"
    sed -i "s|PLACEHOLDER_REACT_APP_ENV|${REACT_APP_ENV}|g" "${f}"
  else
    echo "Skipping placeholders in file not found: $f"
  fi
}

echo "Injecting runtime variables ..."

for f in ${SRV_DIR}/*.html; do
  inject_env $f
done

for f in ${SRV_DIR}/static/css/*.css; do
  inject_env $f
done

for f in ${SRV_DIR}/static/js/*.js; do
  inject_env $f
done

exec "$@"
