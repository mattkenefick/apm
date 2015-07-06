## APM
#### Application Package Manager

    APM stands for Application Package Manager. It manages dependencies for an
    HTML5 based application, that will be stored locally for faster loading and
    to circumvent cellular/wifi requirements.

    An HTML5 mobile web application requires markup, styles, and scripts to run.
    In order to auto update, the assets need to be updated based on versioning.
    This project acts as a loader for those assets to keep everything up-to-date
    and able to run locally without internet connectivity. Assets are held in
    `localStorage` and then executed at runtime.

    Plug this in and you'll be able to always automatically maintain the latest
    version of your app whether or not your customers have internet access.


### Notes

    This is a work in progress, started on July 3rd 2015. The ideology is taken
    from what ChalkySticks runs on. This repository is a consolidation of code
    required to perform these tasks.

    As of July 3rd, 2015, this project is not functional yet. There are functional
    items in other projects that still need to be implemented.

### Usage

Projects will only use the compiled files in `deployment`. Any contributers
can work on files in `src` and push changes to `deployment` by running gulp.


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
            cache: true,
            expires: 60 * 60 * 24,
            version: "~1.0.0",
            filename: "compiled.css",
            onRemoteFailure: apm.nothing,
            onRemoteSuccess: apm.nothing,
            onSuccess: apm.nothing
        },
        javascript: {
            cache: false,
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
                beforeElement: apm.null,
                replaceElement: "#templates",
                appendToElement: apm.null,
            }
        }
    });
