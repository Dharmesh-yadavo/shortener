import { QrCode, EyeOff, Trash2, MoreHorizontal, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const QrDropDownAction = ({
  shortCode,
  currentState,
}: {
  shortCode: string;
  currentState: boolean;
}) => {
  //
  const handleHide = async ({
    shortCode,
    currentState,
  }: {
    shortCode: string;
    currentState: boolean;
  }) => {};

  const handleDelete = async (shortCode: string) => {};

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
        <Link href={`/dashboard/qr-code/${shortCode}`}>
          <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
            <Palette size={18} className="text-slate-500" />
            <span className="font-medium text-slate-700">Customize</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          className="cursor-pointer gap-3 py-2.5"
          onClick={() => handleHide({ shortCode, currentState })}
        >
          <EyeOff size={18} className="text-slate-500" />
          <span className="font-medium text-slate-700">Hide QR Code</span>
        </DropdownMenuItem>

        <Link href={`/dashboard/links/${shortCode}`}>
          <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
            <QrCode size={18} className="text-slate-500" />
            <span className="font-medium text-slate-700">
              Short link details
            </span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="my-1" />

        {/* Delete action usually triggers a function/modal */}
        <DropdownMenuItem
          className="cursor-pointer gap-3 py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => handleDelete(shortCode)}
        >
          <Trash2 size={18} />
          <span className="font-medium">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
