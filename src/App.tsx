import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Loader, Message } from '@theme';
import cn from '@common/utils/classnames';
import styles from './App.css';
import Footer from './app/Footer';
import Game from './app/Game';

const BROWSER_SUPPORT = 'NDEFReader' in window || true;

const App = () => {
  return (
    <div className={styles.root}>
      {!BROWSER_SUPPORT ? (
        <Message type="error">
          Your Browser does not support the{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API"
            target="_blank"
          >
            WebNFC API
          </a>
        </Message>
      ) : (
        <Game />
      )}
      <Footer className={cn(styles.footer)} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
