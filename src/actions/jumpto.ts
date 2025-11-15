import { action, streamDeck, KeyDownEvent, SingletonAction, WillAppearEvent, DidReceiveSettingsEvent } from "@elgato/streamdeck";

type JumpToSettings = {
    Identifier: string
};

@action({ UUID: "com.openspace-team.openspace-stream-deck-plugin.jumpto" })
class JumpTo extends SingletonAction<JumpToSettings> {
        
    override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
        return ev.action.setTitle("JumpTo button");
    }

    override async onKeyDown(ev: KeyDownEvent<JumpToSettings>): Promise<void> {
        let jumpToIdentifier = (ev.payload.settings.Identifier) ? ev.payload.settings.Identifier as string : "";
        if (jumpToIdentifier) {
            streamDeck.logger.info(`JUMPTO ACTION: ${jumpToIdentifier}`);
            globalThis.openspace.navigation.jumpTo(jumpToIdentifier);
        } else {
            streamDeck.logger.info("No jumpTo identifier defined.", ev.payload.settings);
            globalThis.openspace.printWarning("Stream Deck button pressed, but no jumpTo target was chosen.");
        }
    }
}
export { JumpTo };