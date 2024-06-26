#!/bin/bash

set -euo pipefail
set +x

if [[ -z "${GCE_ACCOUNT}" ]]; then
  echo ":fire: GCP credentials not set." 1>&2
  exit 1
fi

if [[ -z "${GITHUB_TOKEN}" ]]; then
  echo ":fire: GitHub token not set." 1>&2
  exit 1
fi

# Run EUI build/deploy script, set in the template parameter
# Expects env: GPROJECT, GCE_ACCOUNT, GIT_BRANCH, GITHUB_TOKEN from pre_command.sh
./packages/eui/scripts/deploy/deploy_docs
