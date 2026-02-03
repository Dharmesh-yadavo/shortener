import { Copy, BarChart2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DialogType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  generatedLink: string | null;
};

export const DialogComp = ({
  open,
  onOpenChange,
  generatedLink,
}: DialogType) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center p-8">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold flex gap-2">
              Your link is ready! 🎉
            </DialogTitle>
          </div>
          <p className="text-slate-500 text-sm mt-2">
            Copy the link below to share it or choose a platform to share it to.
          </p>
        </DialogHeader>

        {/* Generated Link Display Area */}
        <div className="bg-slate-50 border-2 border-dashed border-blue-100 rounded-xl p-6 my-4">
          <h3 className="text-blue-700 font-bold text-xl mb-4">
            <Link
              href={generatedLink ? generatedLink : ""}
              className="font-bold truncate flex-1 hover:underline"
            >
              {generatedLink}
            </Link>
          </h3>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              className="flex gap-2 text-blue-600 border-blue-200"
            >
              <BarChart2 size={18} /> View link details
            </Button>
            <Button
              className="flex gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                navigator.clipboard.writeText(generatedLink || "");
                // Optional: Add toast notification here
              }}
            >
              <Copy size={18} /> Copy link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
