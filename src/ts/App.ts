import Main from './Main';

//types
import { AgentConfig, ServerConfig } from "./types/Types";

//json files
import * as agent_data from '../../res/config.json';
import * as server_data from '../../res/server_config.json';

function loadAgentConfig(): AgentConfig {
    var json = {
        "registered": false,
        "uuid": ""
    };
    json.registered = (<any>agent_data).registered;
    json.uuid = (<any>agent_data).uuid;
    return json;
}

function loadServerConfig(): ServerConfig {
    var json = {
        "protocol": "",
        "address": "",
        "registration_port": -1,
        "main_port":-1,
        "secret": ""
    };
    json.protocol = (<any>server_data).protocol;
    json.address = (<any>server_data).address;
    json.registration_port = (<any>server_data).registration_port;
    json.main_port = (<any>server_data).main_port;
    json.secret = (<any>server_data).secret;
    return json;
}

/**
 * 1.) Check if the agent is registered, if not, register
 * 2.) If agent is registered, load websocket events.
 */

export let agentConfig: AgentConfig = loadAgentConfig();
export let serverConfig: ServerConfig = loadServerConfig();

function checkRegistered(): boolean {
    return agentConfig.registered;
}

if(!checkRegistered()) {
    first_time_setup();
}
else{
    normal_start();
}

function first_time_setup() {
    let socket : any = require('socket.io-client')(`${serverConfig.protocol}://${serverConfig.address}:${serverConfig.registration_port}`);
    console.log("Attempting to connect to server...");
    socket.on('connect', function() {
        console.log("Connected to server. Sending security key to server");
        socket.emit("authenticate", serverConfig.secret);
        socket.on("authenticated", function () {
            console.log("Agent has been authenticated.");
            socket.emit("register", require("os").hostname, require("./Registration").register);
        });
    });
}

function normal_start() {
    let socket : any = require('socket.io-client')(`${serverConfig.protocol}://${serverConfig.address}:${serverConfig.main_port}`);
    Main.main(socket);
}