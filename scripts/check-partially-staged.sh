#!/usr/bin/env bash

CMD=$1
FILE=$2

if [[ $(git diff --name-only "$FILE") != "" ]]
then
  H1=$(git hash-object "$FILE") 

  npm run "$CMD" "$FILE"

  H2=$(git hash-object "$FILE")

  if [[ "$H1" != "$H2" ]]
  then
    echo "Oh snap! Precommit hook failed after fixing partially staged file: ${FILE}"
    echo "Please reset & restage your hunks and commit again... 😅"
    exit 1
  else
    git add "$FILE"
  fi
else
  npm run "$CMD" "$FILE"
  git add "$FILE"
fi
