# JupyterLab EventListener

[![Github Actions Status](https://github.com/Zsailer/jupyterlab-eventlistener/workflows/Build/badge.svg)](https://github.com/Zsailer/jupyterlab-eventlistener/actions/workflows/build.yml)

A JupyterLab Plugin for listening to Jupyter events in the frontend.

The API mirrors the [Listener API](https://jupyter-events.readthedocs.io/en/latest/user_guide/listeners.html) in the server-side (Python) Jupyter Events package.

## Basic Usage

Once this extension is installed, another extension can consume the `IEventListener` token and register custom listeners to Jupyter Events.

Below is a basic example of a plugin that "listens" to Kernel Action events from Jupyter Server and shows a toast notification in the UI.

```typescript
import {
  Notification
} from '@jupyterlab/apputils';

import { Event } from '@jupyterlab/services';
import { IEventListener } from 'jupyterlab-eventlistener';

const kernelActionEventSchema = "https://events.jupyter.org/jupyter_server/kernel_actions/v1";


type KernelEventType = {
    msg: string;
    action: string;
    kernel_id?: string;
    kernel_name?: string;
    status?: string;
    status_code?: number;
}


async function kernelEventListener(manager, schemaId, event: Event.Emission) => {
    let data = (event as KernelEventType);
    // Show a notification
    let message `The ${kernel_name} kernel with ID ${kernel_id} action ${action} has status ${status}.`
    Notification.info(
        message,
        {
            autoClose: 5000,
        }
    );
}

/**
 * The IEventList
 */
const myPlugin: JupyterFrontEndPlugin<void> = {
  id: "myplugin",
  description: 'A plugin that uses the Event Listener API and shows a notification.',
  autoStart: true,
  requires: [
    IEventListener
  ],
  activate: async (
    app: JupyterFrontEnd,
    eventListener: IEventListener
  ) => {

    eventListener.addListener(
      kernelActionEventSchema,
      kernelEventListener
    );
  }
};
```

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_eventlistener
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_eventlistener
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_eventlistener directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_eventlistener
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-eventlistener` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
