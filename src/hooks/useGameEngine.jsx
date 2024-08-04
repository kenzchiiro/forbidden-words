import React from 'react';
import { useEffect } from 'react';
import {
    isHost,
    onPlayerJoin,
    useMultiplayerState,
    usePlayersList,
} from 'playroomkit';
import { randInt } from 'three/src/math/MathUtils.js';
import data from '../data.json';
import { getState } from 'playroomkit';


const GameEngineContext = React.createContext();

export const GameEngineProvider = ({ children }) => {
    // GAME STATE
    
    // const [words, setWords] = useMultiplayerState("words", data.words);
    const [wordsOwner, setWordsOwner] = useMultiplayerState("wordsOwner", []);
    const [mode, setMode] = useMultiplayerState("mode", "survive");
    const [state, setState] = useMultiplayerState("state", "");


    const players = usePlayersList(true)
    players.sort((a, b) => a.id.localeCompare(b.id));

    const gameState = {
        players,
        wordsOwner,
    };


    const startGame = () => {
        const isStarted = getState("state") ==="started" ? true: false
        if (isHost()&&!isStarted) {
            setState("started",true)
            console.log("start game");
            var obj = {};
            const randomDataIndex = randInt(0, data.length - 1);
            players.forEach((player) => {
                const words = data[randomDataIndex].words
                const randomWordsIndex = randInt(0, words.length - 1);
                player.setState("word", words[randomWordsIndex], true);
                obj[player.getProfile().name] = words[randomWordsIndex]
                setWordsOwner(obj,true)
                words.splice(randomWordsIndex, 1);
            });
        }
        return
    };

    const restartGame = () => {
        if (isHost()) {
            setState("started",true)
            console.log("restart game");
            var obj = {};
            const randomDataIndex = randInt(0, data.length - 1);
            players.forEach((player) => {
                const words = data[randomDataIndex].words
                const randomWordsIndex = randInt(0, words.length - 1);
                player.setState("word", words[randomWordsIndex], true);
                obj[player.getProfile().name] = words[randomWordsIndex]
                setWordsOwner(obj,true)
                words.splice(randomWordsIndex, 1);
            });
        }
        return
    };

    const setLose = (playerName) => {
        if (isHost()) {
            console.log("start game");
            players.forEach((player) => {
                if (player.getProfile().name===playerName){
                    player.setState("status","lose")
                }
            });
        }
        return
    };

    const switchMode = () => {
        if (isHost()) {
            const newMode = mode==="survive"? "team": "survive"
            setMode(newMode,true)
            console.log(newMode)
        }
        return
    };

    useEffect(() => {
        startGame();
    }, []);


    return (
        <GameEngineContext.Provider value={
            { 
                ...gameState, 
                startGame, 
                restartGame,
                setLose,
                switchMode,
            }
        }>
            {children}
        </GameEngineContext.Provider>
    );
};


export const useGameEngine = () => {
    const context = React.useContext(GameEngineContext);
    if (context === undefined) {
        throw new Error("useGameEngine must be use within a GameEngineProvider")
    }
    return context
};
