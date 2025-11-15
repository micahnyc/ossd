import { action, streamDeck, KeyDownEvent, SingletonAction, WillAppearEvent, DidReceiveSettingsEvent } from "@elgato/streamdeck";

type TriggerActionSettings = {
    actionIdentifier: string,
    actionName: string,
    actionPath: string
};

@action({ UUID: "com.openspace-team.openspace-stream-deck-plugin.trigger-action" })
class TriggerAction extends SingletonAction<TriggerActionSettings> {
        
    override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
        return ev.action.setTitle("Trigger Action button");
    }

    override async onKeyDown(ev: KeyDownEvent<TriggerActionSettings>): Promise<void> {
        let actionIdentifier = (ev.payload.settings.actionIdentifier) ? ev.payload.settings.actionIdentifier as string : "";
        if (actionIdentifier) {
            streamDeck.logger.info(`TRIGGER ACTION: ${actionIdentifier}`);
            let lua = "globalThis.openspace.action.triggerAction('" + actionIdentifier + "');";
            eval(lua);
        } else {
            streamDeck.logger.info("No action identifier defined.", ev.payload.settings);
            globalThis.openspace.printWarning("Stream Deck button pressed, but no action was chosen.");
        }
    }
}
export { TriggerAction };