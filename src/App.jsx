import React, {useState} from 'react';
import StartupVideo from './StartupVideo.jsx';
import StatsScreen from './PipBoyUI.jsx';
import PipBoyMap from './map'; // Adjust path if needed (e.g. './components/map')
import 'leaflet/dist/leaflet.css';





function App(){
  const [videoDone, setVideoDone] = useState(false);

  return (
    <div className="app">
      
      {videoDone ? (
          <StatsScreen/>
      ) : (
        <StartupVideo onVideoEnd={() => setVideoDone(true)} />
      )}

    </div>

  );
}

export default App;

   