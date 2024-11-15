import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IEventListener, EventListener } from './token';

const PLUGIN_ID = 'jupyterlab-eventlistener';

const eventlistener: JupyterFrontEndPlugin<EventListener> = {
  id: PLUGIN_ID,
  description:
    "An API for listening to events coming off of JupyterLab's event manager.",
  autoStart: true,
  provides: IEventListener,
  activate: async (app: JupyterFrontEnd) => {
    console.log(`${PLUGIN_ID} has been activated!`);
    await app.serviceManager.ready;
    const eventListener = new EventListener(app.serviceManager.events);
    return eventListener;
  }
};

export default eventlistener;
