import Main from './Main';
import socketio from "socket.io";
import * as agent_data from '../../res/config.json';
import * as server_data from '../../res/server_config.json';

//Export this to types file
type AgentConfig = {
    initialised: boolean;
    uuid: string;
}

type ServerConfig = {
    protocol: string;
    address: string;
    port: number;
    secret: string;
}

function loadAgentConfig(): AgentConfig {
    var json = {
        "initialised": false,
        "uuid": ""
    };
    json.initialised = (<any>agent_data).initialised;
    json.uuid = (<any>agent_data).uuid;
    return json;
}

function loadServerConfig(): ServerConfig {
    var json = {
        "protocol": "",
        "address": "",
        "port": -1,
        "secret": ""
    };
    json.protocol = (<any>server_data).protocol;
    json.address = (<any>server_data).address
    json.port = (<any>server_data).port;
    json.secret = (<any>server_data).secret
    return json;
}

export let agentConfig: AgentConfig = loadAgentConfig();
export let serverConfig: ServerConfig = loadServerConfig();

const socket = socketio(`${serverConfig.protocol}://${serverConfig.address}:${serverConfig.port}`);
connect();

function connect(): void {
    socket.emit("authenticate", serverConfig.secret);
}

socket.on("authenticated", function (response: boolean) {
    if (response) {
        console.log("Agent is authenticated.")
        authenticated();
    }
    else {
        console.log("Agent is unauthenticated.");
    }
});

function authenticated(): void {
    if (!checkInitialised()) {
        //First time Setup
        first_time_setup();
    }
    else {
        //Normal start (default case)
        normal_start();
    }
}

function checkInitialised(): boolean {
    return agentConfig.initialised;
}

function first_time_setup() {

}

function normal_start() {
    Main.main();
}