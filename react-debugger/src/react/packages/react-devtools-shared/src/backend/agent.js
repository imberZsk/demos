/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *      
 */

import EventEmitter from '../events';
import throttle from 'lodash.throttle';
import {
  SESSION_STORAGE_LAST_SELECTION_KEY,
  SESSION_STORAGE_RELOAD_AND_PROFILE_KEY,
  SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY,
  __DEBUG__,
} from '../constants';
import {
  sessionStorageGetItem,
  sessionStorageRemoveItem,
  sessionStorageSetItem,
} from 'react-devtools-shared/src/storage';
import setupHighlighter from './views/Highlighter';
import {
  initialize as setupTraceUpdates,
  toggleEnabled as setTraceUpdatesEnabled,
} from './views/TraceUpdates';
import {patch as patchConsole} from './console';
import {currentBridgeProtocol} from 'react-devtools-shared/src/bridge';

                                                                    
             
                   
             
             
            
            
             
                    
                       
                 
             
                  
               
                                                  
import {isSynchronousXHRSupported} from './utils';

const debug = (methodName        , ...args               ) => {
  if (__DEBUG__) {
    console.log(
      `%cAgent %c${methodName}`,
      'color: purple; font-weight: bold;',
      'font-weight: bold;',
      ...args,
    );
  }
};

                             
             
                     
  

                            
                
             
                               
                     
  

                          
             
                               
                     
  

                             
                         
             
                                      
                     
                    
  

                           
             
                 
                               
                     
                         
             
  

                    
             
                               
                     
                         
             
  

                                                        

                         
                 
                   
             
                               
                     
  

                         
                 
                   
             
                                  
                                  
                     
  

                                  
                 
                   
             
                               
                     
             
  

                            
             
                     
                      
  

                               
             
                     
                         
  

                           
                     
                         
  

export default class Agent extends EventEmitter  
                          
                                    
                            
                           
               
                                  
                                        
                          
   {
  _bridge               ;
  _isProfiling          = false;
  _recordChangeDescriptions          = false;
  _rendererInterfaces                                              = {};
  _persistedSelection                            = null;
  _persistedSelectionMatch                   = null;
  _traceUpdatesEnabled          = false;

  constructor(bridge               ) {
    super();

    if (
      sessionStorageGetItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY) === 'true'
    ) {
      this._recordChangeDescriptions =
        sessionStorageGetItem(
          SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY,
        ) === 'true';
      this._isProfiling = true;

      sessionStorageRemoveItem(SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY);
      sessionStorageRemoveItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY);
    }

    const persistedSelectionString = sessionStorageGetItem(
      SESSION_STORAGE_LAST_SELECTION_KEY,
    );
    if (persistedSelectionString != null) {
      this._persistedSelection = JSON.parse(persistedSelectionString);
    }

    this._bridge = bridge;

    bridge.addListener('clearErrorsAndWarnings', this.clearErrorsAndWarnings);
    bridge.addListener('clearErrorsForFiberID', this.clearErrorsForFiberID);
    bridge.addListener('clearWarningsForFiberID', this.clearWarningsForFiberID);
    bridge.addListener('copyElementPath', this.copyElementPath);
    bridge.addListener('deletePath', this.deletePath);
    bridge.addListener('getBackendVersion', this.getBackendVersion);
    bridge.addListener('getBridgeProtocol', this.getBridgeProtocol);
    bridge.addListener('getProfilingData', this.getProfilingData);
    bridge.addListener('getProfilingStatus', this.getProfilingStatus);
    bridge.addListener('getOwnersList', this.getOwnersList);
    bridge.addListener('inspectElement', this.inspectElement);
    bridge.addListener('logElementToConsole', this.logElementToConsole);
    bridge.addListener('overrideError', this.overrideError);
    bridge.addListener('overrideSuspense', this.overrideSuspense);
    bridge.addListener('overrideValueAtPath', this.overrideValueAtPath);
    bridge.addListener('reloadAndProfile', this.reloadAndProfile);
    bridge.addListener('renamePath', this.renamePath);
    bridge.addListener('setTraceUpdatesEnabled', this.setTraceUpdatesEnabled);
    bridge.addListener('startProfiling', this.startProfiling);
    bridge.addListener('stopProfiling', this.stopProfiling);
    bridge.addListener('storeAsGlobal', this.storeAsGlobal);
    bridge.addListener(
      'syncSelectionFromNativeElementsPanel',
      this.syncSelectionFromNativeElementsPanel,
    );
    bridge.addListener('shutdown', this.shutdown);
    bridge.addListener(
      'updateConsolePatchSettings',
      this.updateConsolePatchSettings,
    );
    bridge.addListener('updateComponentFilters', this.updateComponentFilters);
    bridge.addListener('viewAttributeSource', this.viewAttributeSource);
    bridge.addListener('viewElementSource', this.viewElementSource);

    // Temporarily support older standalone front-ends sending commands to newer embedded backends.
    // We do this because React Native embeds the React DevTools backend,
    // but cannot control which version of the frontend users use.
    bridge.addListener('overrideContext', this.overrideContext);
    bridge.addListener('overrideHookState', this.overrideHookState);
    bridge.addListener('overrideProps', this.overrideProps);
    bridge.addListener('overrideState', this.overrideState);

    if (this._isProfiling) {
      bridge.send('profilingStatus', true);
    }

    // Send the Bridge protocol and backend versions, after initialization, in case the frontend has already requested it.
    // The Store may be instantiated beore the agent.
    const version = process.env.DEVTOOLS_VERSION;
    if (version) {
      this._bridge.send('backendVersion', version);
    }
    this._bridge.send('bridgeProtocol', currentBridgeProtocol);

    // Notify the frontend if the backend supports the Storage API (e.g. localStorage).
    // If not, features like reload-and-profile will not work correctly and must be disabled.
    let isBackendStorageAPISupported = false;
    try {
      localStorage.getItem('test');
      isBackendStorageAPISupported = true;
    } catch (error) {}
    bridge.send('isBackendStorageAPISupported', isBackendStorageAPISupported);
    bridge.send('isSynchronousXHRSupported', isSynchronousXHRSupported());

    setupHighlighter(bridge, this);
    setupTraceUpdates(this);
  }

  get rendererInterfaces()                                              {
    return this._rendererInterfaces;
  }

  clearErrorsAndWarnings                                     = ({
    rendererID,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      renderer.clearErrorsAndWarnings();
    }
  };

  clearErrorsForFiberID                               = ({id, rendererID}) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      renderer.clearErrorsForFiberID(id);
    }
  };

  clearWarningsForFiberID                               = ({
    id,
    rendererID,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      renderer.clearWarningsForFiberID(id);
    }
  };

  copyElementPath                            = ({
    id,
    path,
    rendererID,
  }                   ) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      const value = renderer.getSerializedElementValueByPath(id, path);

      if (value != null) {
        this._bridge.send('saveToClipboard', value);
      } else {
        console.warn(`Unable to obtain serialized value for element "${id}"`);
      }
    }
  };

  deletePath                           = ({
    hookID,
    id,
    path,
    rendererID,
    type,
  }                  ) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.deletePath(type, id, hookID, path);
    }
  };

  getInstanceAndStyle({
    id,
    rendererID,
  }                      )                          {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
      return null;
    }
    return renderer.getInstanceAndStyle(id);
  }

  getBestMatchingRendererInterface(node        )                           {
    let bestMatch = null;
    for (const rendererID in this._rendererInterfaces) {
      const renderer = ((this._rendererInterfaces[
        (rendererID     )
      ]     )                   );
      const fiber = renderer.getFiberForNative(node);
      if (fiber !== null) {
        // check if fiber.stateNode is matching the original hostInstance
        if (fiber.stateNode === node) {
          return renderer;
        } else if (bestMatch === null) {
          bestMatch = renderer;
        }
      }
    }
    // if an exact match is not found, return the first valid renderer as fallback
    return bestMatch;
  }

  getIDForNode(node        )                {
    const rendererInterface = this.getBestMatchingRendererInterface(node);
    if (rendererInterface != null) {
      try {
        return rendererInterface.getFiberIDForNative(node, true);
      } catch (error) {
        // Some old React versions might throw if they can't find a match.
        // If so we should ignore it...
      }
    }
    return null;
  }

  getBackendVersion             = () => {
    const version = process.env.DEVTOOLS_VERSION;
    if (version) {
      this._bridge.send('backendVersion', version);
    }
  };

  getBridgeProtocol             = () => {
    this._bridge.send('bridgeProtocol', currentBridgeProtocol);
  };

  getProfilingData                                     = ({rendererID}) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    }

    this._bridge.send('profilingData', renderer.getProfilingData());
  };

  getProfilingStatus             = () => {
    this._bridge.send('profilingStatus', this._isProfiling);
  };

  getOwnersList                               = ({id, rendererID}) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      const owners = renderer.getOwnersList(id);
      this._bridge.send('ownersList', ({id, owners}            ));
    }
  };

  inspectElement                               = ({
    forceFullData,
    id,
    path,
    rendererID,
    requestID,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      this._bridge.send(
        'inspectedElement',
        renderer.inspectElement(requestID, id, path, forceFullData),
      );

      // When user selects an element, stop trying to restore the selection,
      // and instead remember the current selection for the next reload.
      if (
        this._persistedSelectionMatch === null ||
        this._persistedSelectionMatch.id !== id
      ) {
        this._persistedSelection = null;
        this._persistedSelectionMatch = null;
        renderer.setTrackedPath(null);
        this._throttledPersistSelection(rendererID, id);
      }

      // TODO: If there was a way to change the selected DOM element
      // in native Elements tab without forcing a switch to it, we'd do it here.
      // For now, it doesn't seem like there is a way to do that:
      // https://github.com/bvaughn/react-devtools-experimental/issues/102
      // (Setting $0 doesn't work, and calling inspect() switches the tab.)
    }
  };

  logElementToConsole                               = ({id, rendererID}) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.logElementToConsole(id);
    }
  };

  overrideError                              = ({
    id,
    rendererID,
    forceError,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.overrideError(id, forceError);
    }
  };

  overrideSuspense                                 = ({
    id,
    rendererID,
    forceFallback,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.overrideSuspense(id, forceFallback);
    }
  };

  overrideValueAtPath                                    = ({
    hookID,
    id,
    path,
    rendererID,
    type,
    value,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.overrideValueAtPath(type, id, hookID, path, value);
    }
  };

  // Temporarily support older standalone front-ends by forwarding the older message types
  // to the new "overrideValueAtPath" command the backend is now listening to.
  overrideContext                      = ({
    id,
    path,
    rendererID,
    wasForwarded,
    value,
  }) => {
    // Don't forward a message that's already been forwarded by the front-end Bridge.
    // We only need to process the override command once!
    if (!wasForwarded) {
      this.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: 'context',
        value,
      });
    }
  };

  // Temporarily support older standalone front-ends by forwarding the older message types
  // to the new "overrideValueAtPath" command the backend is now listening to.
  overrideHookState                             = ({
    id,
    hookID,
    path,
    rendererID,
    wasForwarded,
    value,
  }) => {
    // Don't forward a message that's already been forwarded by the front-end Bridge.
    // We only need to process the override command once!
    if (!wasForwarded) {
      this.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: 'hooks',
        value,
      });
    }
  };

  // Temporarily support older standalone front-ends by forwarding the older message types
  // to the new "overrideValueAtPath" command the backend is now listening to.
  overrideProps                      = ({
    id,
    path,
    rendererID,
    wasForwarded,
    value,
  }) => {
    // Don't forward a message that's already been forwarded by the front-end Bridge.
    // We only need to process the override command once!
    if (!wasForwarded) {
      this.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: 'props',
        value,
      });
    }
  };

  // Temporarily support older standalone front-ends by forwarding the older message types
  // to the new "overrideValueAtPath" command the backend is now listening to.
  overrideState                      = ({
    id,
    path,
    rendererID,
    wasForwarded,
    value,
  }) => {
    // Don't forward a message that's already been forwarded by the front-end Bridge.
    // We only need to process the override command once!
    if (!wasForwarded) {
      this.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: 'state',
        value,
      });
    }
  };

  reloadAndProfile                                              =
    recordChangeDescriptions => {
      sessionStorageSetItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY, 'true');
      sessionStorageSetItem(
        SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY,
        recordChangeDescriptions ? 'true' : 'false',
      );

      // This code path should only be hit if the shell has explicitly told the Store that it supports profiling.
      // In that case, the shell must also listen for this specific message to know when it needs to reload the app.
      // The agent can't do this in a way that is renderer agnostic.
      this._bridge.send('reloadAppForProfiling');
    };

  renamePath                           = ({
    hookID,
    id,
    newPath,
    oldPath,
    rendererID,
    type,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.renamePath(type, id, hookID, oldPath, newPath);
    }
  };

  selectNode(target        )       {
    const id = this.getIDForNode(target);
    if (id !== null) {
      this._bridge.send('selectFiber', id);
    }
  }

  setRendererInterface(
    rendererID            ,
    rendererInterface                   ,
  ) {
    this._rendererInterfaces[rendererID] = rendererInterface;

    if (this._isProfiling) {
      rendererInterface.startProfiling(this._recordChangeDescriptions);
    }

    rendererInterface.setTraceUpdatesEnabled(this._traceUpdatesEnabled);

    // When the renderer is attached, we need to tell it whether
    // we remember the previous selection that we'd like to restore.
    // It'll start tracking mounts for matches to the last selection path.
    const selection = this._persistedSelection;
    if (selection !== null && selection.rendererID === rendererID) {
      rendererInterface.setTrackedPath(selection.path);
    }
  }

  setTraceUpdatesEnabled                                         =
    traceUpdatesEnabled => {
      this._traceUpdatesEnabled = traceUpdatesEnabled;

      setTraceUpdatesEnabled(traceUpdatesEnabled);

      for (const rendererID in this._rendererInterfaces) {
        const renderer = ((this._rendererInterfaces[
          (rendererID     )
        ]     )                   );
        renderer.setTraceUpdatesEnabled(traceUpdatesEnabled);
      }
    };

  syncSelectionFromNativeElementsPanel             = () => {
    const target = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0;
    if (target == null) {
      return;
    }
    this.selectNode(target);
  };

  shutdown             = () => {
    // Clean up the overlay if visible, and associated events.
    this.emit('shutdown');
  };

  startProfiling                                              =
    recordChangeDescriptions => {
      this._recordChangeDescriptions = recordChangeDescriptions;
      this._isProfiling = true;
      for (const rendererID in this._rendererInterfaces) {
        const renderer = ((this._rendererInterfaces[
          (rendererID     )
        ]     )                   );
        renderer.startProfiling(recordChangeDescriptions);
      }
      this._bridge.send('profilingStatus', this._isProfiling);
    };

  stopProfiling             = () => {
    this._isProfiling = false;
    this._recordChangeDescriptions = false;
    for (const rendererID in this._rendererInterfaces) {
      const renderer = ((this._rendererInterfaces[
        (rendererID     )
      ]     )                   );
      renderer.stopProfiling();
    }
    this._bridge.send('profilingStatus', this._isProfiling);
  };

  stopInspectingNative                              = selected => {
    this._bridge.send('stopInspectingNative', selected);
  };

  storeAsGlobal                              = ({
    count,
    id,
    path,
    rendererID,
  }) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.storeAsGlobal(id, path, count);
    }
  };

  updateConsolePatchSettings    
                                  
                                  
                               
                                         
                                         
             = ({
    appendComponentStack,
    breakOnConsoleErrors,
    showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode,
    browserTheme,
  }                      ) => {
    // If the frontend preferences have changed,
    // or in the case of React Native- if the backend is just finding out the preferences-
    // then reinstall the console overrides.
    // It's safe to call `patchConsole` multiple times.
    patchConsole({
      appendComponentStack,
      breakOnConsoleErrors,
      showInlineWarningsAndErrors,
      hideConsoleLogsInStrictMode,
      browserTheme,
    });
  };

  updateComponentFilters                                                     =
    componentFilters => {
      for (const rendererID in this._rendererInterfaces) {
        const renderer = ((this._rendererInterfaces[
          (rendererID     )
        ]     )                   );
        renderer.updateComponentFilters(componentFilters);
      }
    };

  viewAttributeSource                            = ({id, path, rendererID}) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.prepareViewAttributeSource(id, path);
    }
  };

  viewElementSource                               = ({id, rendererID}) => {
    const renderer = this._rendererInterfaces[rendererID];
    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      renderer.prepareViewElementSource(id);
    }
  };

  onTraceUpdates                                   = nodes => {
    this.emit('traceUpdates', nodes);
  };

  onFastRefreshScheduled             = () => {
    if (__DEBUG__) {
      debug('onFastRefreshScheduled');
    }

    this._bridge.send('fastRefreshScheduled');
  };

  onHookOperations                                      = operations => {
    if (__DEBUG__) {
      debug(
        'onHookOperations',
        `(${operations.length}) [${operations.join(', ')}]`,
      );
    }

    // TODO:
    // The chrome.runtime does not currently support transferables; it forces JSON serialization.
    // See bug https://bugs.chromium.org/p/chromium/issues/detail?id=927134
    //
    // Regarding transferables, the postMessage doc states:
    // If the ownership of an object is transferred, it becomes unusable (neutered)
    // in the context it was sent from and becomes available only to the worker it was sent to.
    //
    // Even though Chrome is eventually JSON serializing the array buffer,
    // using the transferable approach also sometimes causes it to throw:
    //   DOMException: Failed to execute 'postMessage' on 'Window': ArrayBuffer at index 0 is already neutered.
    //
    // See bug https://github.com/bvaughn/react-devtools-experimental/issues/25
    //
    // The Store has a fallback in place that parses the message as JSON if the type isn't an array.
    // For now the simplest fix seems to be to not transfer the array.
    // This will negatively impact performance on Firefox so it's unfortunate,
    // but until we're able to fix the Chrome error mentioned above, it seems necessary.
    //
    // this._bridge.send('operations', operations, [operations.buffer]);
    this._bridge.send('operations', operations);

    if (this._persistedSelection !== null) {
      const rendererID = operations[0];
      if (this._persistedSelection.rendererID === rendererID) {
        // Check if we can select a deeper match for the persisted selection.
        const renderer = this._rendererInterfaces[rendererID];
        if (renderer == null) {
          console.warn(`Invalid renderer id "${rendererID}"`);
        } else {
          const prevMatch = this._persistedSelectionMatch;
          const nextMatch = renderer.getBestMatchForTrackedPath();
          this._persistedSelectionMatch = nextMatch;
          const prevMatchID = prevMatch !== null ? prevMatch.id : null;
          const nextMatchID = nextMatch !== null ? nextMatch.id : null;
          if (prevMatchID !== nextMatchID) {
            if (nextMatchID !== null) {
              // We moved forward, unlocking a deeper node.
              this._bridge.send('selectFiber', nextMatchID);
            }
          }
          if (nextMatch !== null && nextMatch.isFullMatch) {
            // We've just unlocked the innermost selected node.
            // There's no point tracking it further.
            this._persistedSelection = null;
            this._persistedSelectionMatch = null;
            renderer.setTrackedPath(null);
          }
        }
      }
    }
  };

  onUnsupportedRenderer(rendererID        ) {
    this._bridge.send('unsupportedRendererVersion', rendererID);
  }

  _throttledPersistSelection      = throttle(
    (rendererID        , id        ) => {
      // This is throttled, so both renderer and selected ID
      // might not be available by the time we read them.
      // This is why we need the defensive checks here.
      const renderer = this._rendererInterfaces[rendererID];
      const path = renderer != null ? renderer.getPathForElement(id) : null;
      if (path !== null) {
        sessionStorageSetItem(
          SESSION_STORAGE_LAST_SELECTION_KEY,
          JSON.stringify(({rendererID, path}                    )),
        );
      } else {
        sessionStorageRemoveItem(SESSION_STORAGE_LAST_SELECTION_KEY);
      }
    },
    1000,
  );
}
