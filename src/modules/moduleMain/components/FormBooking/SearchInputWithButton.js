import React, { useState, useRef } from 'react';
import styles from './ReusableSearchComponent.module.css'; // Import your CSS styles

// Import necessary icons or components
import { ReactComponent as TreeView } from '../../../../assets/icons/tree-view.svg';

const SearchInputWithButton = ({
  value,
  onSearchChange,
  onButtonClick,
  isButtonVisible = true,
  isDisabled = false,
  placeholder = 'Search...',
  inputRef,
  buttonLabel = 'Browse Tariffs',
  buttonIcon = <TreeView />,
  error = '',
  onInputClick
}) => {
  return (
    <div className={styles['search-parent']}>
      <div className={styles['search-box']}>
        <div className={styles['entryarea']}>
          <input
            required
            autoComplete="off"
            className={styles['input-search']}
            type="text"
            value={value}
            onChange={onSearchChange}
            onClick={onInputClick}
            ref={inputRef}
            placeholder={placeholder}
            disabled={isDisabled}
            style={{
              borderColor: error ? '#f60000' : '#b5b5b58c',
              borderRadius: '9px',
            }}
          />
          {error && <span className={styles['error-text']}>{error}</span>}
        </div>
        {isButtonVisible && (
          <button
            className={styles['btn-accordain']}
            onClick={onButtonClick}
          >
            <span className={styles['btn-title']}>{buttonLabel}</span>
            {buttonIcon}
          </button>
        )}
      </div>
    </div>
  );
};


export default SearchInputWithButton;
