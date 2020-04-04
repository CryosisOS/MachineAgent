import { agentConfig } from "./App";
import fs from "fs";


type AgentConfig = {
    registered: boolean;
    uuid: string;
}

export default class Registration{
    static register(uuid: string){
        agentConfig.registered = true;
        agentConfig.uuid = uuid;
        let newAgentConfig : AgentConfig = {
            registered: true,
            uuid: uuid
        }

        let jsonString = JSON.stringify(newAgentConfig);
        fs.writeFile("../../res/config.json", jsonString, err => {
            if(err) {
                console.log("Error registering agent properly.", err);
            }
            else {
                console.log("Successfully registered agent.");
            }
        })
    }
}