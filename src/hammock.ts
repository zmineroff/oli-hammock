import { SuperActivity, SuperActivityClient } from "./superactivity";
import { Activity } from "./activity";
import { readAssets } from "./assets";
import { validateQuestion } from "./validateinput";
import { Runner } from "./runner";
import { FrameSizer } from "./framesize";

/**
 * Attach boilerplate elements to the page
 */
function initializeHTML(assets: Map<string, Element>, framesizer: FrameSizer): void {
    // Always attach bootstrap to page (kind of ugly)
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
        onload: () => framesizer.check()
    }).appendTo("head");

    // Attach layout assets to page
    const layout = assets.get("layout");
    if (layout) $("#oli-embed").append(layout);

    // ZM - handle images; if asset starts with img- then rest of name is img element ID
    for (const key of assets.keys()) {
        if (key.startsWith("img-")) {
            var imgSrc = assets.get(key);
            if (imgSrc) {
                var imgId = "#" + key.substring(4);
                $(imgId).attr("src", imgSrc + '');
            }
        };
    }
}

/**
 * Wrap the activity into the {@link SuperActivityClient} form that {@link SuperActivity} expects and will
 * call.
 *
 * This is the only function exported by the oli-hammock NPM package. When you are using the OLI Hammock, your
 * entry point should call this function and pass an {@link Activity} to it.
 */
export function hammock<UserData>(activity: Activity<UserData>): SuperActivityClient {
    return {
        init: (superActivity: SuperActivity, activityData: Element): void => {
            /**
             * Get information about the surrounding iFrame.
             */
            const framesizer = new FrameSizer();
            readAssets(superActivity.webContentFolder, activityData).then(assets => {
                initializeHTML(assets, framesizer);
                const questions = validateQuestion(assets.get("questions"));
                const runner = new Runner<UserData>(superActivity, activity, questions);

                // Add interaction buttons
                $("#oli-embed").append(
                    $("<button/>", {
                        class: "btn btn-primary btn-sm",
                        text: "SUBMIT",
                        click: () => {
                            runner.submit().then(() => runner.render());
                        }
                    })
                );

                $("#oli-embed").append(
                    $("<button/>", {
                        class: "btn btn-primary btn-sm",
                        text: "RESET",
                        click: () => {
                            runner.reset().then(() => runner.render());
                        }
                    })
                );

                runner.render();
            });
        }
    };
}
