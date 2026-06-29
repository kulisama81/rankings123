#!/bin/bash
# Quick test script for UCI DataRide API
# Usage: ./test-uci-api.sh [men|women|both]

set -e

GENDER="${1:-both}"

fetch_rankings() {
  local gender=$1
  local rankingId=$2
  local categoryId=$3

  echo "Fetching ${gender} rankings..."

  curl -s -X POST 'https://dataride.uci.ch/iframe/ObjectRankings/' \
    -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
    -H 'User-Agent: Mozilla/5.0 (compatible; rankings123.com)' \
    -H 'X-Requested-With: XMLHttpRequest' \
    --data "rankingId=${rankingId}&disciplineId=10&rankingTypeId=1&take=10&skip=0&page=1&pageSize=10&filter%5Bfilters%5D%5B0%5D%5Bfield%5D=CategoryId&filter%5Bfilters%5D%5B0%5D%5Bvalue%5D=${categoryId}&filter%5Bfilters%5D%5B1%5D%5Bfield%5D=SeasonId&filter%5Bfilters%5D%5B1%5D%5Bvalue%5D=464&filter%5Bfilters%5D%5B2%5D%5Bfield%5D=MomentId&filter%5Bfilters%5D%5B2%5D%5Bvalue%5D=0" \
    | jq -r "\"Total riders: \" + (.total|tostring) + \"\nTop 10:\n\" + (.data[0:10] | map(\"\(.Rank). \(.DisplayName) (\(.CountryIsoCode2)) - \(.Points) pts\") | join(\"\n\"))"

  echo ""
}

if [ "$GENDER" = "men" ] || [ "$GENDER" = "both" ]; then
  echo "=== MEN'S UCI WORLD RANKING ==="
  fetch_rankings "men" 1 22
fi

if [ "$GENDER" = "women" ] || [ "$GENDER" = "both" ]; then
  echo "=== WOMEN'S UCI WORLD RANKING ==="
  fetch_rankings "women" 32 23
fi

echo "✅ UCI API test complete!"
