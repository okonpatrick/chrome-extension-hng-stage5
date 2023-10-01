import React, { useState, useEffect, useRef } from 'react';

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoStream, setVideoStream] = useState(null); // New state for the video stream
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoRef = useRef(null); // Ref for the video element

  // Function to send the recorded video to an endpoint
  const sendVideoToEndpoint = (blob) => {
    const formData = new FormData();
    formData.append('video', blob, 'recorded-video.webm');

    fetch('https://your-api-endpoint.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Video submitted successfully');
        } else {
          console.error('Error submitting video');
        }
      })
      .catch((error) => {
        console.error('Error sending request: ', error);
      });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' });
        setVideoUrl(URL.createObjectURL(blob)); // Set the URL to display the recorded video

        // Send the recorded video to your API endpoint
        sendVideoToEndpoint(blob);

        console.log('Recording stopped');
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Save the video stream in state
      setVideoStream(stream);
    } catch (error) {
      console.error('Error starting recording: ', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    // Set the video stream to the video element
    if (videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div>
      <button className="start-btn" onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button className="stop-btn" onClick={stopRecording} hidden={!isRecording}>
        Stop Recording
      </button>
      {isRecording && <p>Recording...</p>}
      <video
        ref={videoRef}
        width="640"
        height="360"
        autoPlay
        muted
        style={{ display: isRecording ? 'block' : 'none' }}
      ></video>
      {videoUrl && (
         <div className="rounded-video-container">
          <video controls src={videoUrl} width="430" height="260"></video>
        </div>
      )}
    </div>
  );
}

export default Recorder;





// import React, { useState, useEffect, useRef } from 'react';

// function Recorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const mediaStreamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);

//   // Function to send the recorded video to an endpoint
//   const sendVideoToEndpoint = (blob) => {
//     const formData = new FormData();
//     formData.append('video', blob, 'recorded-video.webm');

//     fetch('https://your-api-endpoint.com/upload', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log('Video submitted successfully');
//         } else {
//           console.error('Error submitting video');
//         }
//       })
//       .catch((error) => {
//         console.error('Error sending request: ', error);
//       });
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//       mediaStreamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           recordedChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' });
//         setVideoUrl(URL.createObjectURL(blob)); // Set the URL to display the recorded video

//         // Send the recorded video to your API endpoint
//         sendVideoToEndpoint(blob);

//         console.log('Recording stopped');
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Error starting recording: ', error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//     if (mediaStreamRef.current) {
//       mediaStreamRef.current.getTracks().forEach((track) => track.stop());
//     }
//   };

//     //style the button later

//   return (
//     <div>
//       <button className="start-btn" onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button className="stop-btn" onClick={stopRecording} hidden={!isRecording}>
//         Stop Recording
//       </button>
//       {isRecording && <p>Recording...</p>}
//       {videoUrl && (
//         <div>
//           <video controls src={videoUrl} width="640" height="360"></video>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Recorder;
