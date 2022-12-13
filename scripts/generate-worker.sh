#!/bin/sh

CWD=$(pwd)

VERSION="0.0.1"
OUTPUT_DIR="lib/worker"
TEXTLINTRC_PATH="scripts/textlintrc.json"

if [ ! -e "${CWD}/${TEXTLINTRC_PATH}" ]; then
  echo "textlintrc.yml does not exist."
  exit 1
fi

if [[ -z ${MODE} ]];
then
  MODE="production"
fi

echo "RUNNINNG AS ${MODE} mode..."

npx textlint-script-compiler \
  --cwd "${CWD}" \
  --mode ${MODE} \
  --output-dir ${OUTPUT_DIR} \
  --textlintrc ${TEXTLINTRC_PATH}

