export declare class Config {
    readonly raw: Map<string, object>;
    constructor(raw: Map<string, object>);
    toObject(): any;
    /**
     * set an extension config to the registry.
     * @param id extension id
     * @param config plain config object
     */
    set(id: string, config: object): void;
    /**
     * get a config entry
     * @param id extension id.
     */
    get(id: string): object;
    /**
     * instantiate from a plain config-like object.
     */
    static from(raw: {
        [key: string]: object;
    }): Config;
}
