/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *      
 */

import * as React from 'react';
import {useEffect, useRef} from 'react';
import Button from './Button';
import ButtonIcon from './ButtonIcon';
import Icon from './Icon';

import styles from './SearchInput.css';

              
                             
                                 
                      
                                 
                      
                             
                     
                     
  

export default function SearchInput({
  goToNextResult,
  goToPreviousResult,
  placeholder,
  search,
  searchIndex,
  searchResultsCount,
  searchText,
  testName,
}       )             {
  const inputRef = useRef                         (null);

  const resetSearch = () => search('');

  // $FlowFixMe[missing-local-annot]
  const handleChange = ({currentTarget}) => {
    search(currentTarget.value);
  };
  // $FlowFixMe[missing-local-annot]
  const handleKeyPress = ({key, shiftKey}) => {
    if (key === 'Enter') {
      if (shiftKey) {
        goToPreviousResult();
      } else {
        goToNextResult();
      }
    }
  };

  // Auto-focus search input
  useEffect(() => {
    if (inputRef.current === null) {
      return () => {};
    }

    const handleKeyDown = (event               ) => {
      const {key, metaKey} = event;
      if (key === 'f' && metaKey) {
        if (inputRef.current !== null) {
          inputRef.current.focus();
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };

    // It's important to listen to the ownerDocument to support the browser extension.
    // Here we use portals to render individual tabs (e.g. Profiler),
    // and the root document might belong to a different window.
    const ownerDocument = inputRef.current.ownerDocument;
    ownerDocument.addEventListener('keydown', handleKeyDown);

    return () => ownerDocument.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.SearchInput} data-testname={testName}>
      <Icon className={styles.InputIcon} type="search" />
      <input
        data-testname={testName ? `${testName}-Input` : undefined}
        className={styles.Input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        ref={inputRef}
        value={searchText}
      />
      {!!searchText && (
        <React.Fragment>
          <span
            className={styles.IndexLabel}
            data-testname={testName ? `${testName}-ResultsCount` : undefined}>
            {Math.min(searchIndex + 1, searchResultsCount)} |{' '}
            {searchResultsCount}
          </span>
          <div className={styles.LeftVRule} />
          <Button
            data-testname={testName ? `${testName}-PreviousButton` : undefined}
            disabled={!searchText}
            onClick={goToPreviousResult}
            title={
              <React.Fragment>
                Scroll to previous search result (<kbd>Shift</kbd> +{' '}
                <kbd>Enter</kbd>)
              </React.Fragment>
            }>
            <ButtonIcon type="up" />
          </Button>
          <Button
            data-testname={testName ? `${testName}-NextButton` : undefined}
            disabled={!searchText}
            onClick={goToNextResult}
            title={
              <React.Fragment>
                Scroll to next search result (<kbd>Enter</kbd>)
              </React.Fragment>
            }>
            <ButtonIcon type="down" />
          </Button>
          <Button
            data-testname={testName ? `${testName}-ResetButton` : undefined}
            disabled={!searchText}
            onClick={resetSearch}
            title="Reset search">
            <ButtonIcon type="close" />
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}