const { , validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'my-collage-bus-tracker',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

