"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = require("./assets");
const validateinput_1 = require("./validateinput");
const runner_1 = require("./runner");
const framesize_1 = require("./framesize");
/**
 * Attach boilerplate elements to the page
 */
function initializeHTML(assets, framesizer) {
    // Always attach bootstrap to page (kind of ugly)
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
        onload: () => framesizer.check()
    }).appendTo("head");
    // Attach layout assets to page
    const layout = assets.get("layout");
    if (layout)
        $("#oli-embed").append(layout);
    // ZM - handle images; if asset starts with img- then rest of name is img element ID
    for (const key of assets.keys()) {
        if (key.startsWith("img-")) {
            var imgSrc = assets.get(key);
            if (imgSrc) {
                var imgId = "#" + key.substring(4);
                $(imgId).attr("src", imgSrc + '');
            }
        }
        ;
    }
}
/**
 * Wrap the activity into the {@link SuperActivityClient} form that {@link SuperActivity} expects and will
 * call.
 *
 * This is the only function exported by the oli-hammock NPM package. When you are using the OLI Hammock, your
 * entry point should call this function and pass an {@link Activity} to it.
 */
function hammock(activity) {
    return {
        init: (superActivity, activityData) => {
            /**
             * Get information about the surrounding iFrame.
             */
            const framesizer = new framesize_1.FrameSizer();
            assets_1.readAssets(superActivity.webContentFolder, activityData).then(assets => {
                initializeHTML(assets, framesizer);
                const questions = validateinput_1.validateQuestion(assets.get("questions"));
                const runner = new runner_1.Runner(superActivity, activity, questions);
                // Add interaction buttons
                $("#oli-embed").append($("<button/>", {
                    class: "btn btn-primary btn-sm",
                    text: "SUBMIT",
                    click: () => {
                        runner.submit().then(() => runner.render());
                    }
                }));
                $("#oli-embed").append($("<button/>", {
                    class: "btn btn-primary btn-sm",
                    text: "RESET",
                    click: () => {
                        runner.reset().then(() => runner.render());
                    }
                }));
                runner.render();
            });
        }
    };
}
exports.hammock = hammock;
//# sourceMappingURL=hammock.js.map