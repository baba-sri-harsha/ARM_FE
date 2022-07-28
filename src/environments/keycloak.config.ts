import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.1.39:7688',
  realm: 'myrealm',
  clientId: 'myclient'
};

export default keycloakConfig;

// url: 'http://192.168.1.39:7688'http://localhost:7688',
