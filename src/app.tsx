import './css/styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Othello from './js/othello';

const app = document.getElementById('app');
ReactDOM.render(<Othello cellLength={8} />, app);
