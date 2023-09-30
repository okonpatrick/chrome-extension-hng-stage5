import React, { useState, useEffect, useRef } from 'react';

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

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

    //style the button later

  return (
    <div>
      <button className="start-btn" onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button className="stop-btn" onClick={stopRecording} hidden={!isRecording}>
        Stop Recording
      </button>
      {isRecording && <p>Recording...</p>}
      {videoUrl && (
        <div>
          <video controls src={videoUrl} width="640" height="360"></video>
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
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
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

//   return (
//     <div>
//       <button onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
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











// import React, { useState, useEffect, useRef } from 'react';

// function Recorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const mediaStreamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       mediaStreamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           recordedChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
//         const videoBlobUrl = URL.createObjectURL(blob);
//         setVideoUrl(videoBlobUrl); // Set the URL to display the recorded video
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

//   return (
//     <div>
//       <button onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
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

















// import React, { useState, useEffect, useRef } from 'react';
// import RecordRTC from 'recordrtc';

// function Recorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const mediaStreamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       mediaStreamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           recordedChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
//         const videoUrl = URL.createObjectURL(blob);
//         // Now you can do something with the recorded video URL (e.g., display it in a video element).
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

//   return (
//     <div>
//       <button onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>
//       {isRecording && <p>Recording...</p>}
//     </div>
//   );
// }

// export default Recorder;

















// // src/components/Recorder.js
// import React, { useState, useEffect } from 'react';

// export function Recorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const mediaStreamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);

//    const startRecording = () => {
//     // Implement screen recording logic here
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       mediaStreamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           recordedChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
//         const videoUrl = URL.createObjectURL(blob);
//         // Now you can do something with the recorded video URL (e.g., display it in a video element).
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

//   return (
//     <div>
//       <button onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>
//       {isRecording && <p>Recording...</p>}
//     </div>
//   );
// }

// // export default Recorder;
    
// //   };

// //   const stopRecording = () => {
// //     // Implement stop recording logic here
// //   };

//   return (
//     <div>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//       {isRecording && <p>Recording...</p>}
//     </div>
//   );
// }

// export default Recorder;
