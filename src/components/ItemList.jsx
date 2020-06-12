import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import InputForm from './InputForm';
import Item from './Item';

const ItemList = props => {

    const [pokemonList, setPokemonList] = useState(null);

    // firestoreから全データを取得してstateに格納する関数
    const getPokemonsFromFirestore = async () => {
        const itemListArray = await firebase.firestore().collection('pokemons')
            .orderBy('isDone')
            // .orderBy('limit')   //並び替え
            .get(); //並び替えたやつを取ってくる
        const todoArray = itemListArray.docs.map(x => {
            return {
                id: x.id,
                data: x.data(),
            }
        })
        setPokemonList(todoArray);
        return todoArray;
    }

    // useEffectを利用してFirestoreからデータの一覧を取得．
    useEffect(() => {
        const result = getPokemonsFromFirestore();
    }, [props])

    return (
        <div>
            <InputForm
                getPokemonsFromFirestore={getPokemonsFromFirestore}
            />
            <ul>
                {
                    pokemonList?.map((x, index) =>
                        <Item
                            key={index}
                            pokemon={x}
                            index={index}
                            getPokemonsFromFirestore={getPokemonsFromFirestore}
                        />
                    )
                }
            </ul>
        </div>
    );
}
export default ItemList;