// index.js・・・firebaseの設定を動かすためのファイル

import firebase from 'firebase';
import { firebaseConfig } from './config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebase;