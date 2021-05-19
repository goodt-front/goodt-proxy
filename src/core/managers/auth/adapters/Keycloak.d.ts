import { KeycloakInstance } from 'keycloak-js';
import Adapter from './Adapter';

class Keycloak extends Adapter {
    /** @type {KeycloakInstance} */
    kc: KeycloakInstance;
}

export default Keycloak;
