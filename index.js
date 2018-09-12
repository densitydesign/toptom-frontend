import {mount} from 'riot';
import store from './src/state/store';
import './src/tags/header-bar.tag';
import './src/tags/tool-bar.tag';
import './src/tags/main-content.tag';
import './src/tags/time-line.tag';
import './src/tags/error-bar.tag';
import './src/tags/documents-box.tag';

document.addEventListener('DOMContentLoaded', () => {
	mount('error-bar', {store});
	mount('header-bar', {store});
	mount('tool-bar', {store});
	mount('main-content', {store});
	mount('time-line', {store});
	mount('documents-box', {store});
});
