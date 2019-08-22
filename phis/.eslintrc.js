module.exports = {
    "extends": [
      "eslint:recommended",
      "google"
    ],
    "parserOptions": {
      "ecmaVersion": 9,
      "sourceType": "module"
    },
    "env": {
      "node": 1,
      "browser": 1,
      "es6": true
    },
    "globals": {
      "exampleGlobalVariable": true
    }
  }