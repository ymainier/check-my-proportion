import React, { useState } from "react";
import "./App.css";

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [stream, setStream] = useState(null);

  const startCamera = () => {
    if (stream) return;
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => setStream(stream));
  };
  const stopCamera = () => {
    if (!stream) return;
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    setStream(null);
  };

  const style = { backgroundImage: `url(${imageSrc})` };
  return (
    <div className="App" style={style}>
      <video
        className="video"
        autoPlay
        ref={(video) => {
          if (video) {
            video.srcObject = stream;
          }
        }}
      />
      <input
        className="file"
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          setImageSrc(URL.createObjectURL(file));
        }}
      />
      {stream ? (
        <button className="camera" onClick={stopCamera}>Stop camera</button>
      ) : (
        <button className="camera" onClick={startCamera}>Start camera</button>
      )}
    </div>
  );
}

export default App;
