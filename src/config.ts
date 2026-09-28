// Set to true to show the Our Apps section, or false to hide it.
export const SHOW_OUR_APPS: boolean = false;

export const appsSection = SHOW_OUR_APPS
  ? { id: 'products', label: 'Apps' }
  : { id: 'stores', label: 'App stores' };
