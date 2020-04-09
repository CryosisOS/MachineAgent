export type ServerConfig = {
    protocol: string;
    address: string;
    registration_port: number;
    main_port: number;
    secret: string;
}

export type AgentConfig = {
    registered: boolean;
    uuid: string;
}