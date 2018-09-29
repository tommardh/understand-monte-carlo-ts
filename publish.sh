#!/bin/bash
rm -rf docs
mkdir docs
mkdir docs/charts
cp dist/*.js docs/
cp dist/*.html docs/
cp dist/*.css docs/
cp dist/*.jpg docs/
cp dist/*.gif docs/
cp dist/charts/*.js docs/charts/
