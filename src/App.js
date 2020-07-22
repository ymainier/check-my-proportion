import React, { useState } from "react";
import "./App.css";

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [stream, setStream] = useState(null);
  const [opacity, setOpacity] = useState(75);

  const startCamera = () => {
    if (stream) return;
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: "environment" } })
      .then((stream) => setStream(stream));
  };
  const stopCamera = () => {
    if (!stream) return;
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    setStream(null);
  };

  const style = { backgroundImage: imageSrc ? `url(${imageSrc})` : null };
  return (
    <div className="App" style={style}>
      <div className="video-container" style={{opacity: opacity / 100}}>
        <video
          className="video"
          autoPlay
          ref={(video) => {
            if (video) {
              video.srcObject = stream;
            }
          }}
        />
      </div>
      <input
        className="file"
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          setImageSrc(URL.createObjectURL(file));
        }}
      />
      {stream ? (
        <button className="camera" onClick={stopCamera}>
          Stop camera
        </button>
      ) : (
        <button className="camera" onClick={startCamera}>
          Start camera
        </button>
      )}
      <input
        className="range"
        type="range"
        min="0"
        max="100"
        step="5"
        value={opacity}
        onChange={(e) => setOpacity(parseInt(e.target.value, 10))}
      />
    </div>
  );
}

export default App;
