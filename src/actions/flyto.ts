import { action, streamDeck, KeyDownEvent, SingletonAction, WillAppearEvent, DidReceiveSettingsEvent } from "@elgato/streamdeck";

type FlyToSettings = {
    Identifier: string
};

@action({ UUID: "com.openspace-team.openspace-stream-deck-plugin.flyto" })
class FlyTo extends SingletonAction<FlyToSettings> {
        
    override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
        return ev.action.setTitle("FlyTo button");
    }
    
    override async onKeyDown(ev: KeyDownEvent<FlyToSettings>): Promise<void> {
        let flytoIdentifier = (ev.payload.settings.Identifier) ? ev.payload.settings.Identifier as string : "";
        if (flytoIdentifier) {
            streamDeck.logger.info(`FLYTO ACTION: ${flytoIdentifier}`);
            globalThis.openspace.navigation.flyTo(flytoIdentifier);
        } else {
            streamDeck.logger.info("No action identifier defined.", ev.payload.settings);
            globalThis.openspace.printWarning("Stream Deck button pressed, but no action was chosen.");
        }
    }
}
export { FlyTo };