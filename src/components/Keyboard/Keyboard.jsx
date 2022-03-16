import React, {useCallback, useContext, useEffect} from 'react';
import "./Keyboard.css"
import Key from "./Key";
import {AppContext} from "../../App";

function Keyboard() {
    const {onSelectLetter, onDeleteLetter, onEnter, disabledLetters } = useContext(AppContext)
    const line1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const line2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const line3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

    const handleKeyBoard = useCallback((event) => {
        if (event.key === 'Enter') {
            onEnter()
        } else if (event.key === 'Backspace') {
            onDeleteLetter()
        } else {
           line1.forEach(key => {
               if (event.key === key) {
                   onSelectLetter(key.toUpperCase())
               }
           });
            line2.forEach(key => {
                if (event.key === key) {
                    onSelectLetter(key.toUpperCase())
                }
            });
            line3.forEach(key => {
                if (event.key === key) {
                    onSelectLetter(key.toUpperCase())
                }
            });
        }
    })

    useEffect(() => {
        document.addEventListener("keydown", handleKeyBoard);

        return () => {
            document.removeEventListener("keydown", handleKeyBoard)
        }
    }, [handleKeyBoard])


    return (
        <div className="keyboard" onKeyDown={handleKeyBoard}>
            <div className={'line1'}>{line1.map(i => <Key key={i} keyVal={i.toUpperCase()} bigKey={false} disabled={disabledLetters.includes(i)}/>)}</div>
            <div className={'line2'}>{line2.map(i => <Key key={i} keyVal={i.toUpperCase()} bigKey={false} disabled={disabledLetters.includes(i)}/>)}</div>
            <div className={'line3'}>
                <Key keyVal={"ENTER"} bigKey={true}/>
                {line3.map(i => <Key key={i} keyVal={i.toUpperCase()} bigKey={false} disabled={disabledLetters.includes(i)}/>)}
                <Key keyVal={"DELETE"} bigKey={true}/>
            </div>
        </div>
    );
}

export default Keyboard;