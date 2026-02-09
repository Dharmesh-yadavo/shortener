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
import {
  handleDeleteAction,
  toggleLinkVisibility,
} from "@/server/users/users.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

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
  }) => {
    const result = await toggleLinkVisibility(shortCode, currentState);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard/qr-code");
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async (shortCode: string) => {
    const result = await handleDeleteAction(shortCode);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard/qr-code");
    } else {
      toast.error(result.message);
    }
  };

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
            <span className="font-medium text-slate-700">View QR Details</span>
          </DropdownMenuItem>
        </Link>

        <Link href={`/dashboard/qr-code/${shortCode}/edit/customize`}>
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
