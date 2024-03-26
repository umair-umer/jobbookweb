import React, {useState} from 'react';
import AgoraUIKit from 'agora-react-uikit';

function Videocall() {
    const [videoCall, setVideoCall] = useState(true);
    const rtcProps = {
      appId: '<Agora App ID>',
      channel: 'test', // your agora channel
      token: '<Your channel Token>' // use null or skip if using app in testing mode
    };
    const callbacks = {
      EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
      <div style={{display: 'flex', width: '100vw', height: '100vh'}}>
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
      </div>
    ) : (
      <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
    );
    }
export default Videocall