## APM
#### Application Package Manager

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
