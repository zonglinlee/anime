import {
  settings,
} from './consts.js';

import {
  isBrowser,
  isDocumentHidden,
} from './helpers.js';

export const activeInstances = [];

let raf;

function tick(t) {
  // memo on algorithm issue:
  // dangerous iteration over mutable `activeInstances`
  // (that collection may be updated from within callbacks of `tick`-ed animation instances)
  let activeInstancesLength = activeInstances.length;
  let i = 0;
  while (i < activeInstancesLength) {
    const activeInstance = activeInstances[i];
    if (!activeInstance.paused) {
      activeInstance.tick(t);
      i++;
    } else {
      activeInstances.splice(i, 1);
      activeInstancesLength--;
    }
  }
  raf = i > 0 ? requestAnimationFrame(tick) : undefined;
}

export function startEngine() {
  if (!raf && (!isDocumentHidden() || !settings.suspendWhenDocumentHidden) && activeInstances.length > 0) {
    raf = requestAnimationFrame(tick);
  }
}

if (isBrowser) {
  function handleVisibilityChange() {
    if (!settings.suspendWhenDocumentHidden) return;

    if (isDocumentHidden()) {
      // suspend ticks
      raf = cancelAnimationFrame(raf);
    } else {
      // is back to active tab
      // first adjust animations to consider the time that ticks were suspended
      activeInstances.forEach(
        instance => instance ._onDocumentVisibility()
      );
      startEngine();
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange);
}
