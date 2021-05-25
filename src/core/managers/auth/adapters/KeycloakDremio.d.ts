import { SDK } from '@/core/dremio/sdk';
import Keycloak from './Keycloak';

class KeycloakDremio extends Keycloak {
    private _cache: {
        permissions: any;
        userPermissions: any;
    };
    private _clearCache(): void;

    dremio: SDK;
}

export default KeycloakDremio;
