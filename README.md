## APM
#### Application Package Manager

    APM stands for Application Package Manager. It manages dependencies for an
    HTML5 based application, that will be stored locally for faster loading and
    to circumvent cellular/wifi requirements.

    An HTML5 mobile web application requires markup, styles, and scripts to run.
    In order to auto update, the assets need to be updated based on versioning.
    This project acts as a loader for those assets to keep everything up-to-date
    and able to run locally without internet connectivity.

    Plug this in and you'll be able to always automatically maintain the latest
    version of your app whether or not your customers have internet access.


### Installation

Run `npm install` from within the `src` directory to install required
files.


### Compiling / Assets

Run `gulp` or `gulp watch` to compile Javascript required for the app. It
is exported out to the `deployment` directory.

### Example Setup

    apm.load({
        appName: "my-application",
        appUrl: "http://www.polymermallard.com/apps",
        css: {
            version: "~1.0.0",
            filename: "compiled.css",
            onRemoteFailure: apm.nothing,
            onRemoteSuccess: apm.nothing,
            onSuccess: apm.nothing
        },
        javascript: {
            filename: "main.js",
            version: "latest",
            onRemoteFailure: apm.nothing,
            onRemoteSuccess: apm.nothing,
            onSuccess: apm.nothing
        },
        html: {
            version: "latest",
            filename: "template.html",
            options: {
                replaceElement: "#templates",
                appendToElement: apm.null,
                onSuccess: apm.nothing
            }
        }
    });

    console.log( apm.javascript );
