name: Node.js Package

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14.x'
    - name: Install Dependencies
      run: npm install
    - name: Build and Publish
      env:
        NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
      run: |
        npm run build
        npm publish
${INSERT_HERE}
