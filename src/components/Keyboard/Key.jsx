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
        <div className={'key'} onClick={() => selectLetter(keyVal)}>
            <span id={bigKey ? 'bigger' : disabled && 'disabled'}><i>{keyVal}</i></span>
        </div>
    );
}

export default Key;