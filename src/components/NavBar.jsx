
import { isHost } from 'playroomkit';
import { useGameEngine } from '../hooks/useGameEngine';

function NavBar() {

    const { restartGame, switchMode } = useGameEngine();
    const disabled = !isHost() ? "disabled" : ""

    return (

        <div className="navbar bg-base-100 text-neutral shadow-md rounded-xl">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Forbidden Words</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1" disabled={true}>
                    <li className={disabled}>
                        <details>
                            <summary disabled={true}>Setting</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li>
                                    <label className="swap">
                                        <input type="checkbox" onChange={() => switchMode()}/>
                                        <div className="swap-off">Survival</div>
                                        <div className="swap-on">Team</div>
                                    </label>

                                </li>
                                <li><a onClick={() => restartGame()}>Restart</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;