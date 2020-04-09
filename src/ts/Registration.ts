import fs from "fs";

//class exports
import { agentConfig, serverConfig } from "./App";

//types
import { AgentConfig, ServerConfig } from "./types/Types";


export function register(uuid: string, mainPort: number) {
    serverConfig.main_port = mainPort;
    agentConfig.registered = true;
    agentConfig.uuid = uuid;
    let newAgentConfig: AgentConfig = {
        registered: true,
        uuid: uuid
    };
    let jsonString = JSON.stringify(newAgentConfig);
    fs.writeFile("./res/config.json", jsonString, err => {
        if (err) {
            console.log("Error registering agent properly.", err);
        }
        else {
            console.log("Successfully updated Agent Config.");
        }
    });
    let newServerConfig: ServerConfig = {
        protocol: serverConfig.protocol,
        address: serverConfig.address,
        registration_port: serverConfig.registration_port,
        main_port: serverConfig.main_port,
        secret: serverConfig.secret
    };
    jsonString = JSON.stringify(newServerConfig);
    fs.writeFile("./res/server_config.json", jsonString, err => {
        if (err) {
            console.log("Error registering agent properly.", err);
        }
        else {
            console.log("Successfully updated Server Config.");
        }
    });

    console.log("Agent has been registered with server.");
}