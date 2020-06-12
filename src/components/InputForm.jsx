import React, { useState } from 'react';
// import firebase from '../firebase';
import firebase, { storage } from "../firebase";

import '../App.css';

const InputForm = ({ getPokemonsFromFirestore }) => {  //分割代入
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [image, setImage] = useState('');

    // Firestoreにデータを送信する関数
    const postDataToFirestore = async (collectionName, postData) => {
        const addedData = await firebase.firestore().collection(collectionName).add(postData);
        return addedData;
    }

    // submitボタンクリック時の処理
    const submitData = async () => {
        if (name === '' || detail === '' || image === '') { return false };
        const postData = {
            name: name,
            detail: detail,
            image: image,
            // limit: new Date(limit),
            isDone: false,
        }
        const addedData = await postDataToFirestore('pokemons', postData);
        setImage('');
        setName('');
        setDetail('');
        getPokemonsFromFirestore();
    }

    return (
        <form action="">
            <ul>
                <li>
                    <label htmlFor="image">　　画像：</label>
                    {/* <img src={image} alt="uploaded" /> */}
                    <input
                        type="file"
                        id="image"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="name">　なまえ：</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="detail">詳細情報：</label>
                    <input
                        type="text"
                        id="detail"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                    />
                </li>
                <li>
                    <button
                        type="button"
                        onClick={submitData}
                    >submit</button>
                </li>
            </ul>
        </form>
    )
}

export default InputForm;