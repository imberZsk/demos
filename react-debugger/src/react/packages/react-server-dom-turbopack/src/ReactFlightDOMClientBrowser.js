/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *      
 */

                                                   

                                                                                   

                                                                              

import {
  createResponse,
  getRoot,
  reportGlobalError,
  processBinaryChunk,
  close,
} from 'react-client/src/ReactFlightClient';

import {
  processReply,
  createServerReference,
} from 'react-client/src/ReactFlightReplyClient';

                                                                

                       
                                  
  

function createResponseFromOptions(options                ) {
  return createResponse(
    null,
    null,
    options && options.callServer ? options.callServer : undefined,
    undefined, // nonce
  );
}

function startReadingFromStream(
  response                ,
  stream                ,
)       {
  const reader = stream.getReader();
  function progress({
    done,
    value,
  }   
                  
                
       
   )                       {
    if (done) {
      close(response);
      return;
    }
    const buffer             = (value     );
    processBinaryChunk(response, buffer);
    return reader.read().then(progress).catch(error);
  }
  function error(e     ) {
    reportGlobalError(response, e);
  }
  reader.read().then(progress).catch(error);
}

function createFromReadableStream   (
  stream                ,
  options          ,
)              {
  const response                 = createResponseFromOptions(options);
  startReadingFromStream(response, stream);
  return getRoot(response);
}

function createFromFetch   (
  promiseForResponse                   ,
  options          ,
)              {
  const response                 = createResponseFromOptions(options);
  promiseForResponse.then(
    function (r) {
      startReadingFromStream(response, (r.body     ));
    },
    function (e) {
      reportGlobalError(response, e);
    },
  );
  return getRoot(response);
}

function encodeReply(
  value                  ,
)          
                                      
  /* We don't use URLSearchParams yet but maybe */ {
  return new Promise((resolve, reject) => {
    processReply(value, '', resolve, reject);
  });
}

export {
  createFromFetch,
  createFromReadableStream,
  encodeReply,
  createServerReference,
};
