const { streamDeck } = import("@elgato/streamdeck");


import OpenSpaceApi from './api';
import Socket from './socket';


console.log("Setup API script executed.");

const socket = new Socket('localhost', 4682);
const api = new OpenSpaceApi(socket);

api.onDisconnect(() => {
  console.log('Disconnected from OpenSpace');
});

api.onConnect(async () => {
  console.log('Connected to OpenSpace');
  let openspace = {};
  try {
    openspace = await api.singleReturnLibrary();
    openspace.time.setDeltaTime(60);
    console.log('OpenSpace library loaded: \n', openspace);
  } catch (e) {
    console.log('OpenSpace library could not be loaded: Error: \n', e);
    return;
  }
});

api.connect();

