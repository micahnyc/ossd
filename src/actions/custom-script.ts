import { action, streamDeck, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

type CustomScriptSettings = {
	customScript: string;
};

@action({ UUID: "com.openspace-team.openspace-stream-deck-plugin.custom-script" })
class CustomScript extends SingletonAction<CustomScriptSettings> {
        
    override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
            return ev.action.setTitle("Add custom script button");
    }

    override async onKeyDown(ev: KeyDownEvent<CustomScriptSettings>): Promise<void> {
        let customScript = (ev.payload.settings.customScript) ? ev.payload.settings.customScript as string : "";
        if (customScript) {
            // Execute the custom script
            streamDeck.logger.info(`Executing custom script: ${customScript}`);
            eval("globalThis." + customScript);
        } else {
            streamDeck.logger.info("No custom script defined.");
            globalThis.openspace.printWarning("Stream Deck button pressed, but no custom script defined.");

        }
    }
    
}
export { CustomScript };