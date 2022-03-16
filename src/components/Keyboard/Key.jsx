import React, {useContext} from 'react';
import {AppContext} from "../../App";

function Key({keyVal, bigKey, disabled}) {
    const {onSelectLetter, onDeleteLetter, onEnter} = useContext(AppContext);

    const selectLetter = (keyVal) => {
        if (keyVal === "ENTER") {
            onEnter()
        } else if (keyVal === "DELETE") {
            onDeleteLetter()
        } else {
            onSelectLetter(keyVal)
        }
    }

    return (
        <div className={'key'} id={bigKey ? 'bigger' : disabled && 'disabled'} onClick={() => selectLetter(keyVal)}>{keyVal}</div>
    );
}

export default Key;