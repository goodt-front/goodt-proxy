import { KeycloakInstance } from 'keycloak-js';
import Adapter from './Adapter';

class Keycloak extends Adapter {
    keycloakInstance: KeycloakInstance;
}

export default Keycloak;
