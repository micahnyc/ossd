import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { TriggerAction } from "./actions/trigger-action";
import { CustomScript } from "./actions/custom-script";
import { FlyTo } from "./actions/flyto";
import { JumpTo } from "./actions/jumpto";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);
streamDeck.logger.info("os sd2!");

// Register the actions.
streamDeck.actions.registerAction(new CustomScript());
streamDeck.actions.registerAction(new TriggerAction());
streamDeck.actions.registerAction(new FlyTo());
streamDeck.actions.registerAction(new JumpTo());

// Finally, connect to the Stream Deck.
streamDeck.connect();

//setup openspace api connection
import OpenSpaceApi from './api';
import Socket from './socket';

let socket = null;
let api:OpenSpaceApi = null;

function connectSocket() {
    streamDeck.logger.info('try socket');
    socket = new Socket('localhost', 4681);
    api = new OpenSpaceApi(socket);
    api.onDisconnect(() => {
        streamDeck.logger.info('Disconnected from OpenSpace, trying reconnect in 5 seconds...');
        setTimeout(() => {
            streamDeck.logger.info('Reconnecting socket...');  
            connectSocket();
        }, 5000);

    });
    api.onConnect(async () => {
        streamDeck.logger.info('Connected to OpenSpace');
        let openspace = {};
        try {
            globalThis.openspace = await api.singleReturnLibrary();
            globalThis.openspace.printDebug("Stream Deck Plugin connected to OpenSpace!");
        } catch (e) {
            streamDeck.logger.info('OpenSpace library could not be loaded: Error: \n', e);
            return;
        }
    });
    api.connect();
}

if (!socket) {
    streamDeck.logger.info('Connect socket');
    connectSocket();
} else {
    streamDeck.logger.info('Socket already connected');
}

process.on('uncaughtException', function (err) {
    connectSocket();
})
