import { myPlayer } from 'playroomkit';
import { useGameEngine } from '../hooks/useGameEngine';
import { isHost } from 'playroomkit';

function Base() {

    const { players, wordsOwner, setLose } = useGameEngine();


    let playerBases = players.map(function (player) {
        var playerName = player.getProfile().name;
        var word = wordsOwner[playerName]
        var style = style || {};
        const isMe = player.getProfile().name === myPlayer().getProfile().name ? true : false
        const hostMsg = isHost() && isMe ? " (เจ้าของห้อง)" : ""
        var profile = player ? player.getState("profile") : false;
        var playerStatus = player ? player.getState("status") : false;
        const isLose = playerStatus === "lose" ? true: false
        const color = isLose ? "red": "white"
        style["backgroundColor"] = color;

        return (
            <div className="w-fit flex flex-col carousel-item border-4 rounded-xl border-slate-600" style={style}>
                <div className="flex w-64 justify-start ml-1 items-start font-extrabold text-lg md:text-1xl text-neutral text-left z-40">
                    <div className="flex space-x-2 m-2">
                        <div>{profile.name}<span className="text-xs">{hostMsg}</span></div>
                    </div>
                </div>
                <div className="h-80 content-center">
                    <div className="mt-2 h-full content-center">
                        <div class="flex justify-center">
                                {(!isMe||isLose) && (
                                    <p className='text-3xl text-neutral'>{word}</p>
                                )}
                        </div>
                    </div>
                </div>
                {isHost() && (
                        <button 
                        disabled={isLose}
                        className="btn btn-outline btn-neutral btn-md m-4"
                        onClick={() =>
                            setLose(profile.name)
                        }>
                        LOSE
                        </button>
                )}
            </div>
        )
    });


    return (
        <div className="w-full carousel carousel-center space-x-2 justify-start md:justify-center">
            {playerBases}
        </div>
    );

}

export default Base;
