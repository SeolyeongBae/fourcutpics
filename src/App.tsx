import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import fourcutsImg from "./혜규네컷.png";
import "./App.css";

function App() {
  const [picNums, setPicNums] = useState(0);
  const [pics, setPics] = useState([]);
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const [canvasState, setCanvasState] = useState("none");
  const canvasLocation = [
    [50, 100],
    [582, 100],
    [50, 504],
    [582, 504],
  ];

  const webcamRef = useRef<any>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    setPics((prev) => prev.concat(imageSrc));
    setPicNums((prev) => prev + 1);
  }, [webcamRef]);

  useEffect(() => {
    if (picNums > 3) {
      setCanvasState(() => "");

      const draw = canvas.getContext("2d");
      const backGroundImg = new Image();
      backGroundImg.src = fourcutsImg;
      backGroundImg.onload = function () {
        draw!.drawImage(backGroundImg, 0, 0, 1144, 938);

        pics.map((pic, index) => {
          const img = new Image();
          img.src = pic;
          img.onload = function () {
            draw!.drawImage(
              img,
              canvasLocation[index][0],
              canvasLocation[index][1],
              512,
              384
            );
          };
        });
      };
    }
  }, [picNums]);

  const downloadPic = () => {
    const image = canvas.toDataURL(); // 이미지 저장하는 코드
    const link = document.createElement("a");
    link.href = image;
    link.download = "혜규네컷";
    link.click();
  };

  function GoToCamera() {
    // 다시 촬영
    setPicNums(() => 0);
    setPics(() => []);
    setCanvasState(() => "none");
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          zIndex: "100",
          backgroundColor: "white",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 0%)",
        }}
      >
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          독일에 있는 혜규를 위한 인생네컷!!
          <p>처음 카메라가 나올 떄까지 기다려 보세용</p>
        </div>
        <>
          <canvas
            id="canvas"
            width="1144px"
            height="938px"
            style={{ display: canvasState }}
          ></canvas>

          {picNums <= 3 ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{
                  width: "1024px",
                  height: "768px",
                }}
              />

              <button
                onClick={capture}
                className="App-header"
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
                  fontSize: "30px",
                }}
              >
                {picNums + 1}
              </button>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", fontSize: "20px" }}>
                생일 축하해~!
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                <div
                  onClick={GoToCamera}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "10px",
                    padding: "0 20px 0 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor: "pink",
                  }}
                >
                  <p>다시 찍기</p>
                </div>
                <div
                  onClick={downloadPic}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 20px 0 20px",
                    margin: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor: "pink",
                  }}
                >
                  <p> 다운로드 </p>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default App;
