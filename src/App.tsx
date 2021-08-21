import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Loader, Message } from '@theme';
import cn from '@common/utils/classnames';
import styles from './App.css';
import Footer from './app/Footer';

const BROWSER_SUPPORT = "NDEFReader" in window;

const App = () => {

  return (
    <div className={styles.root}>
      <Footer className={cn(styles.footer)} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
