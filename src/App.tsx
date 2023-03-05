import { AnyPtrRecord } from "dns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const [picNums, setPicNums] = useState(0);
  const [pics, setPics] = useState([]);

  const webcamRef = useRef<any>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    setPics((prev) => prev.concat(imageSrc));
    setPicNums((prev) => prev + 1);
  }, [webcamRef]);

  useEffect(() => {
    if (picNums > 3) {
      console.log(pics);
      // canvas.toBlob((blob: any) => {
      //   //캔버스의 이미지를 파일 객체로 만드는 과정
      //   let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
      //   const uploadFile = [file]; //이미지 객체
      // }, "image/jpeg");
    } else {
      // const image = canvas.toDataURL(); // 이미지 저장하는 코드
      // const link = document.createElement("a");
      // link.href = image;
      // link.download = "PaintJS[🎨]";
      // link.click();
    }
  }, [picNums]);

  function GoToCamera() {
    // 다시 촬영
    setPicNums(() => 0);
    setPics(() => []);
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
      <>
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
            <div
              onClick={capture}
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
          </>
        ) : (
          <>
            <div
              style={{
                width: "1920px",
                height: "1080px",
                display: "grid",
                gridTemplateColumns: "512px 512px",
                gridRow: "auto auto",
                gridColumnGap: "20px",
                gridRowGap: "20px",
                margin: "20px auto",
                backgroundColor: "#fff",
              }}
            >
              {pics.length !== 0 &&
                pics.map((pic) => (
                  <img
                    src={pic}
                    style={{
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "512px",
                      height: "384px",
                    }}
                  />
                ))}
            </div>

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
          </>
        )}
      </>
    </div>
  );
}

export default App;
