import React, { useCallback, useEffect, useState } from 'react'
import {Html5Qrcode} from "html5-qrcode"

export default function useQRCodeScan({
    qrcodeMountNodeID = "",
    closeAfterScan = false,
    getQrBoxDimension,
  }) {
    const [decodedQRData, setDecodedQrData] = useState({
      isScanning: false,
      isScanSuccess: false,
      isScanFailure: false,
      data: null,
      error: "",
    });
    const html5QrCodeScannerRef = React.useRef(null);
  
    // unmount logic
    useEffect(() => {
      return () => {
        if (html5QrCodeScannerRef.current) {
          html5QrCodeScannerRef.current
            ?.stop()
            ?.then((ignore) => {
              // QR Code scanning is stopped
              console.log("stopped after successful scan");
            })
            ?.catch((err) => {
              // Stop failed, handle it.
              console.log("fails to stop after successfull scan result ");
            });
        }
      };
    }, []);
  
    function stopQrCode() {
      if (html5QrCodeScannerRef.current) {
        html5QrCodeScannerRef.current
          ?.stop()
          ?.then((ignore) => {
            // QR Code scanning is stopped
            console.log("stopped after successful scan");
          })
          ?.catch((err) => {
            // Stop failed, handle it.
            console.log("fails to stop after successfull scan result ");
          });
      }
    }
    function startQrCode() {
      try {
        setDecodedQrData({
          ...decodedQRData,
          isScanning: true,
          data: null,
        });
        // eslint-disable-next-line
        const html5qrCodeScanner = new Html5Qrcode(qrcodeMountNodeID);
  
        html5QrCodeScannerRef.current = html5qrCodeScanner;
  
        let qrbox = 250;
        if (getQrBoxDimension) {
          qrbox = getQrBoxDimension();
        }
  
        html5qrCodeScanner
          .start(
            // { deviceId: { exact: cameraId } },
            { facingMode: "environment" },
            { fps: 40, qrbox, aspectRatio: 1.777778 },
            (qrCodeMessage) => {
              // do something when code is read
              console.log({qrCodeMessage})
              setDecodedQrData({
                ...decodedQRData,
                isScanSuccess: true,
                isScanning: false,
                data: qrCodeMessage,
                error: "",
              });
  
              if (closeAfterScan) {
                html5qrCodeScanner
                  .stop()
                  .then((ignore) => {
                    // QR Code scanning is stopped.
                    // setIsOpenCamera(false);
                    console.log("stopped after successful scan");
                  })
                  .catch((err) => {
                    // Stop failed, handle it.
                    console.log("fails to stop after succesfull scan result ");
                  });
              }
            },
            (errorMessage) => {}
          )
          .catch((err) => {
            console.log('ERROR >> ',err)
            setDecodedQrData({
              ...decodedQRData,
              isScanSuccess: false,
              isScanning: false,
              isScanFailure: true,
              data: null,
              error: err || "QR Code parsing failed",
            });
          });
      } catch (e) {
        setDecodedQrData({
          ...decodedQRData,
          isScanSuccess: false,
          isScanning: false,
          isScanFailure: true,
          data: null,
          error: e || "QR Code parsing failed",
        });
      }
    }
  
    return {
      startQrCode,
      decodedQRData,
      stopQrCode,
    };
  }
  