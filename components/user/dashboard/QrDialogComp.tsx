"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code"; // Updated import
import { motion } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type DialogType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  generatedLink: string;
};

export const QrDialogComp = ({
  open,
  onOpenChange,
  generatedLink,
}: DialogType) => {
  //
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
      }

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-code-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-8 pb-4  items-center">
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
            Your QR is ready! 🎉
          </DialogTitle>
          <p className="text-slate-500 text-sm font-medium">
            Scan to test or download to share.
          </p>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-6">
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              ref={qrRef}
              className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-100"
            >
              {/* Correct component for react-qr-code */}
              <QRCode
                value={generatedLink}
                size={200}
                level="H"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </motion.div>

            <div className="mt-6 w-full">
              <p className="text-[10px] font-mono text-slate-400 bg-white border border-slate-100 py-2 px-3 rounded-lg truncate">
                {generatedLink}
              </p>
            </div>
          </div>

          <Button
            onClick={downloadQR}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 gap-2"
          >
            <Download size={18} /> Download High-Res PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
