/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *      
 */

import memoize from 'memoize-one';
import throttle from 'lodash.throttle';
import Agent from 'react-devtools-shared/src/backend/agent';
import {hideOverlay, showOverlay} from './Highlighter';

                                                                    

// This plug-in provides in-page highlighting of the selected element.
// It is used by the browser extension and the standalone DevTools shell (when connected to a browser).
// It is not currently the mechanism used to highlight React Native views.
// That is done by the React Native Inspector component.

let iframesListeningTo                         = new Set();

export default function setupHighlighter(
  bridge               ,
  agent       ,
)       {
  bridge.addListener(
    'clearNativeElementHighlight',
    clearNativeElementHighlight,
  );
  bridge.addListener('highlightNativeElement', highlightNativeElement);
  bridge.addListener('shutdown', stopInspectingNative);
  bridge.addListener('startInspectingNative', startInspectingNative);
  bridge.addListener('stopInspectingNative', stopInspectingNative);

  function startInspectingNative() {
    registerListenersOnWindow(window);
  }

  function registerListenersOnWindow(window     ) {
    // This plug-in may run in non-DOM environments (e.g. React Native).
    if (window && typeof window.addEventListener === 'function') {
      window.addEventListener('click', onClick, true);
      window.addEventListener('mousedown', onMouseEvent, true);
      window.addEventListener('mouseover', onMouseEvent, true);
      window.addEventListener('mouseup', onMouseEvent, true);
      window.addEventListener('pointerdown', onPointerDown, true);
      window.addEventListener('pointermove', onPointerMove, true);
      window.addEventListener('pointerup', onPointerUp, true);
    } else {
      agent.emit('startInspectingNative');
    }
  }

  function stopInspectingNative() {
    hideOverlay(agent);
    removeListenersOnWindow(window);
    iframesListeningTo.forEach(function (frame) {
      try {
        removeListenersOnWindow(frame.contentWindow);
      } catch (error) {
        // This can error when the iframe is on a cross-origin.
      }
    });
    iframesListeningTo = new Set();
  }

  function removeListenersOnWindow(window     ) {
    // This plug-in may run in non-DOM environments (e.g. React Native).
    if (window && typeof window.removeEventListener === 'function') {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('mousedown', onMouseEvent, true);
      window.removeEventListener('mouseover', onMouseEvent, true);
      window.removeEventListener('mouseup', onMouseEvent, true);
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('pointermove', onPointerMove, true);
      window.removeEventListener('pointerup', onPointerUp, true);
    } else {
      agent.emit('stopInspectingNative');
    }
  }

  function clearNativeElementHighlight() {
    hideOverlay(agent);
  }

  function highlightNativeElement({
    displayName,
    hideAfterTimeout,
    id,
    openNativeElementsPanel,
    rendererID,
    scrollIntoView,
  }   
                               
                              
               
                                     
                       
                            
       
   ) {
    const renderer = agent.rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);

      hideOverlay(agent);
      return;
    }

    // In some cases fiber may already be unmounted
    if (!renderer.hasFiberWithId(id)) {
      hideOverlay(agent);
      return;
    }

    const nodes                      = (renderer.findNativeNodesForFiberID(
      id,
    )     );

    if (nodes != null && nodes[0] != null) {
      const node = nodes[0];
      // $FlowFixMe[method-unbinding]
      if (scrollIntoView && typeof node.scrollIntoView === 'function') {
        // If the node isn't visible show it before highlighting it.
        // We may want to reconsider this; it might be a little disruptive.
        node.scrollIntoView({block: 'nearest', inline: 'nearest'});
      }

      showOverlay(nodes, displayName, agent, hideAfterTimeout);

      if (openNativeElementsPanel) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0 = node;
        bridge.send('syncSelectionToNativeElementsPanel');
      }
    } else {
      hideOverlay(agent);
    }
  }

  function onClick(event            ) {
    event.preventDefault();
    event.stopPropagation();

    stopInspectingNative();

    bridge.send('stopInspectingNative', true);
  }

  function onMouseEvent(event            ) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onPointerDown(event            ) {
    event.preventDefault();
    event.stopPropagation();

    selectFiberForNode(getEventTarget(event));
  }

  let lastHoveredNode                     = null;
  function onPointerMove(event            ) {
    event.preventDefault();
    event.stopPropagation();

    const target              = getEventTarget(event);
    if (lastHoveredNode === target) return;
    lastHoveredNode = target;

    if (target.tagName === 'IFRAME') {
      const iframe                    = (target     );
      try {
        if (!iframesListeningTo.has(iframe)) {
          const window = iframe.contentWindow;
          registerListenersOnWindow(window);
          iframesListeningTo.add(iframe);
        }
      } catch (error) {
        // This can error when the iframe is on a cross-origin.
      }
    }

    // Don't pass the name explicitly.
    // It will be inferred from DOM tag and Fiber owner.
    showOverlay([target], null, agent, false);

    selectFiberForNode(target);
  }

  function onPointerUp(event            ) {
    event.preventDefault();
    event.stopPropagation();
  }

  const selectFiberForNode = throttle(
    memoize((node             ) => {
      const id = agent.getIDForNode(node);
      if (id !== null) {
        bridge.send('selectFiber', id);
      }
    }),
    200,
    // Don't change the selection in the very first 200ms
    // because those are usually unintentional as you lift the cursor.
    {leading: false},
  );

  function getEventTarget(event            )              {
    if (event.composed) {
      return (event.composedPath()[0]     );
    }

    return (event.target     );
  }
}