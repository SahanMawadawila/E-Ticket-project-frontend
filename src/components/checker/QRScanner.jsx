import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ scanResult, setScanResult }) => {
  const qrCodeRegionId = "qr-reader";
  const html5QrCodeScannerRef = useRef(null);

  useEffect(() => {
    const config = { fps: 10, qrbox: 250 };

    const onScanSuccess = (decodedText, decodedResult) => {
      html5QrCodeScannerRef.current.clear();
      setScanResult(decodedText);
    };

    const onScanFailure = (error) => {};

    html5QrCodeScannerRef.current = new Html5QrcodeScanner(
      qrCodeRegionId,
      config,
      false
    );
    html5QrCodeScannerRef.current.render(onScanSuccess, onScanFailure);

    // Cleanup function
    return () => {
      html5QrCodeScannerRef.current.clear();
    };
  }, [scanResult]);

  return (
    <div>
      <div id={qrCodeRegionId} />
    </div>
  );
};

export default QRScanner;
