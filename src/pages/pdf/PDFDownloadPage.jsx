import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PDF from "./PDF";

export default function PDFDownloadPage() {
  const { state } = useLocation();
  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer width="100%" height="100%">
        <PDF state={state} />
      </PDFViewer>
    </div>
  );
}
