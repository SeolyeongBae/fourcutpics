import { AnyPtrRecord } from "dns";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const video = document.getElementById("videoCam") as HTMLVideoElement;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const [CanvasState, setCanvasState] = useState("none");
  const [CameraState, setCameraState] = useState("");
  const [picNums, setPicNums] = useState(0);
  const [pics, setPics] = useState([]);

  useEffect(() => {
    getWebcam((stream: any) => {
      videoRef.current!.srcObject = stream;
    });
  }, []);

  useEffect(() => {
    if (picNums > 3) {
      setCanvasState(""); // 켄버스 켜기
      setCameraState("none"); //비디오 끄기

      const video = document.getElementById("videoCam") as HTMLVideoElement;
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d");

      if (context == null) return; // context may be null

      context.scale(-1, 1); // 좌우 반전
      context.translate(-1024, 0); // 좌우 반전
      context.drawImage(video, 0, 0, 1024, 768);
      canvas.toBlob((blob: any) => {
        //캔버스의 이미지를 파일 객체로 만드는 과정
        let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
        const uploadFile = [file]; //이미지 객체
      }, "image/jpeg");

      const s: MediaStream = videoRef.current!.srcObject as MediaStream;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      const video = document.getElementById("videoCam") as HTMLVideoElement;

      setPics((prev) => {});
      // const image = canvas.toDataURL(); // 이미지 저장하는 코드
      // const link = document.createElement("a");
      // link.href = image;
      // link.download = "PaintJS[🎨]";
      // link.click();
    }
  }, [picNums]);

  const getWebcam = (callback: any) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  function GoToCamera() {
    // 다시 촬영
    setPicNums(() => 0);
    const context = canvas.getContext("2d");
    if (context == null) return; // context may be null

    context.scale(-1, 1); // 좌우 반전
    context.translate(-1024, 0); // 좌우 반전
    context.drawImage(video, 0, 0, 1024, 768);
    setCanvasState("none");
    setCameraState("");
    getWebcam((stream: any) => {
      videoRef.current!.srcObject = stream;
    });
  }

  function sreenShot() {
    // 카메라 촬영
    setPicNums((prev) => prev + 1);
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "100",
        width: "1024px",
        backgroundColor: "white",
      }}
    >
      <video
        id="videoCam"
        ref={videoRef}
        autoPlay
        style={{
          display: CameraState,
          width: "1024px",
          height: "768px",
        }}
      />

      <canvas
        id="canvas"
        width="1024px"
        height="768px"
        style={{ display: CanvasState }}
      ></canvas>
      {CanvasState === "none" ? (
        <div
          onClick={sreenShot}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70px",
            height: "70px",
            margin: "10px",
            borderRadius: "100px",
            position: "absolute",
            zIndex: "101",
            bottom: "5%",
            left: "46%",
            cursor: "pointer",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "60px",
              height: "60px",
              border: "2px solid",
              borderRadius: "100px",
            }}
          ></div>
        </div>
      ) : (
        <div
          onClick={GoToCamera}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70px",
            height: "70px",
            margin: "10px",
            borderRadius: "10px",
            position: "absolute",
            zIndex: "101",
            bottom: "5%",
            left: "46%",
            cursor: "pointer",
            backgroundColor: "white",
          }}
        >
          <p>다시 촬영</p>
        </div>
      )}
    </div>
  );
}

export default App;
