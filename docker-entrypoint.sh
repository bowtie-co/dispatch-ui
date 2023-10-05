#!/bin/bash

error() {
  red='\033[0;31m'
  nocolor='\033[0m'
  prefix="======>>  "
  suffix="  <<======"
  echo
  echo -e "${red}${prefix}${1}${suffix}${nocolor}"
  echo
}

log() {
  yellow='\033[0;33m'
  nocolor='\033[0m'
  prefix="======>>  "
  suffix="  <<======"
  echo
  echo -e "${yellow}${prefix}${1}${suffix}${nocolor}"
  echo
}

fail() {
  msg=${1:-Failure}
  code=${2:-1}

  error "FATAL: $msg"

  exit $code
}

has_env_var() {
  env | grep "$1" > /dev/null 2>&1
  return $?
}

missing_env_var() {
  if has_env_var $1; then
    return 1
  else
    return 0
  fi
}

APP_ENV=${APP_ENV:-development}
NODE_ENV=${NODE_ENV:-development}

# if [[ "$NODE_ENV" == "development" ]] && [[ -f "Dockerfile" ]]; then
#   ./wait-for-it.sh reach-ui-ngrok:4040 -t 10
#   ./wait-for-it.sh reach-api-ngrok:4040 -t 10

#   sleep 4

#   export REACT_APP_API_ROOT=$(curl -s http://reach-api-ngrok:4040/api/tunnels | grep -o -E '"public_url"\s*\:\s*"[^"]+"' | grep -o -E 'https\:\/\/[^"]+')
#   export REACT_APP_NGROK_URL=$(curl -s http://reach-ui-ngrok:4040/api/tunnels | grep -o -E '"public_url"\s*\:\s*"[^"]+"' | grep -o -E 'https\:\/\/[^"]+')
#   export REACT_APP_BASE_URL="$REACT_APP_NGROK_URL"

#   if [[ "$REACT_APP_API_ROOT" == "" ]]; then
#     error "[ngrok] Unable to detect url: REACT_APP_API_ROOT"
#   fi

#   if [[ "$REACT_APP_BASE_URL" == "" ]]; then
#     error "[ngrok] Unable to detect url: REACT_APP_BASE_URL"
#   fi

#   if [[ "$REACT_APP_NGROK_URL" == "" ]]; then
#     error "[ngrok] Unable to detect url: REACT_APP_NGROK_URL"
#   else
#     log "[ngrok] REACT_APP_NGROK_URL: $REACT_APP_NGROK_URL"
#   fi
# fi

exec "$@"
