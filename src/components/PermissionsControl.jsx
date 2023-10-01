import React, { useState } from 'react';

function PermissionsControl() {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);

  const toggleCameraPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ video: !cameraPermission })
      .then((stream) => {
        setCameraPermission(!cameraPermission);
        // Handle camera access or perform other actions here
      })
      .catch((error) => {
        console.error('Error toggling camera permission: ', error);
      });
  };

  const toggleAudioPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: !audioPermission })
      .then((stream) => {
        setAudioPermission(!audioPermission);
        // Handle audio access or perform other actions here
      })
      .catch((error) => {
        console.error('Error toggling audio permission: ', error);
      });
  };

  return (
    <div className="container text-center">
      
      <div className="row">
        <div className="col"> <i class="bi bi-camera-video"><h className="cam-class">Camera</h></i>
          <button
            className={`btn ${cameraPermission ? 'btn-success' : 'btn-danger'}`}
            onClick={toggleCameraPermission}
          >
            {cameraPermission ? <i class="bi bi-toggle-on"></i> : <i class="bi bi-toggle2-off"></i>}
          </button>
        </div>
        <div className="col"><i class="bi bi-mic"><h className="audio-class">Audio</h></i>
          <button
            className={`btn ${audioPermission ? 'btn-success' : 'btn-danger'}`}
            onClick={toggleAudioPermission}
          >
            {audioPermission ? <i class="bi bi-toggle-on"> </i>: <i class="bi bi-toggle2-off"></i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PermissionsControl;
