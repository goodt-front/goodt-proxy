/**
 * @interface ITransport
 */
export interface ITransport {
    /**
     * Make async request and returns response promise
     */
    request(options: Record<string, any>): Promise<any>;
    /**
     * Disposes transport-related resources
     * (cancel requests, close connections, streams, release memory, sending abort signals and etc.)
     */
    dispose(): void;
}

/**
 * @interface ITransportConstructor
 */
export interface ITransportConstructor {
    new (options?: Record<string, any>): ITransport;
}

/**
 * @interface ITransportFactory
 */
export interface ITransportFactory extends Function {
    (options?: Record<string, any>): ITransport;
}
