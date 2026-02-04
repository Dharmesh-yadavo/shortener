import { Link2, QrCode, EyeOff, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const DropDownAction = ({ linkId }: { linkId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-900 focus-visible:ring-0"
        >
          <MoreHorizontal size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2">
        <Link href={`/dashboard/links/${linkId}`}>
          <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
            <Link2 size={18} className="text-slate-500" />
            <span className="font-medium text-slate-700">
              View link details
            </span>
          </DropdownMenuItem>
        </Link>

        <Link href={`/dashboard/links/${linkId}`}>
          <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
            <QrCode size={18} className="text-slate-500" />
            <span className="font-medium text-slate-700">View QR Code</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
          <EyeOff size={18} className="text-slate-500" />
          <span className="font-medium text-slate-700">Hide link</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        {/* Delete action usually triggers a function/modal */}
        <DropdownMenuItem
          className="cursor-pointer gap-3 py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => console.log("Delete clicked")}
        >
          <Trash2 size={18} />
          <span className="font-medium">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
