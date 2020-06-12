import React from 'react';
import firebase from '../firebase';

import '../App.css';

const Item = ({ index, pokemon, getPokemonsFromFirestore }) => {

    // ドキュメントIDを指定してFirestoreのデータを更新する関数
    const updateDataOnFirestore = async (collectionName, documentId, isDone) => {
        const updatedData = await firebase.firestore()
            .collection(collectionName)
            .doc(documentId)
            .update({
                isDone: isDone ? false : true,
            });
        getPokemonsFromFirestore();
        return
    }

    // ドキュメントIDを指定してFirestoreのデータを削除する関数
    const deleteDataOnFirestore = async (collectionName, documentId) => {
        const removedData = await firebase.firestore()
            .collection(collectionName)
            .doc(documentId)
            .delete();
        getPokemonsFromFirestore();
        return
    }

    return (
        <li key={index} id={pokemon.id}>
            <input
                type="checkbox"
                value={pokemon.id}
                checked={pokemon.data.isDone}
                onChange={e => updateDataOnFirestore('pokemons', pokemon.id, pokemon.data.isDone)}
            />
            <button
                value={pokemon.id}
                onClick={e => deleteDataOnFirestore('pokemons', pokemon.id)}
            >delete</button>
            {
                !pokemon.data.isDone
                    ? <div>
                        <img src={pokemon.data.image} alt={pokemon.data.name} />
                        <p>名前：{pokemon.data.name}</p>
                        <p>詳細情報：{pokemon.data.detail}</p>
                    </div>
                    : <div>
                        <del><img src={pokemon.data.image} alt={pokemon.data.name} /></del>
                        <p><del>名前：{pokemon.data.name}</del></p>
                        <p><del>詳細情報：{pokemon.data.detail}</del></p>
                    </div>
            }
        </li>
    )
}
export default Item;