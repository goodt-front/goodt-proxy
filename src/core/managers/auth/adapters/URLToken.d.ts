import { Http } from '@goodt-wcore/net';
import Adapter from './Adapter';

declare class URLToken extends Adapter {
    private _http: Http;
    private _token: string;
    private _authenticated: boolean;
}

export default URLToken;
