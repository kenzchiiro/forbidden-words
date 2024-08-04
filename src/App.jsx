// import { Leva } from 'leva';
import Base from './components/Base';
import NavBar from './components/NavBar';
import { isHost } from 'playroomkit';
import { useGameEngine } from './hooks/useGameEngine';

const DEBUG = false;

function App() {
  const { restartGame } = useGameEngine();
  return (
    <div style={{ backgroundColor: "#FFFFFF"}}>
      <div className="flex flex-col pattern-paper pattern-gray-100 pattern-bg-white pattern-size-20 pattern-opacity-100 h-svh">
        <div className="w-screen justify-center p-2">
          <div className="mb-20 w-full">
          <NavBar/>
          </div>
          <Base className="z-index-10"/>
        </div>
      </div>
      {/* <Leva hiden={!DEBUG || !isHost}></Leva> */}
    </div>
  );

}


export default App;
