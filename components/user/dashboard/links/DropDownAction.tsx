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
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {
  handleDeleteAction,
  toggleLinkVisibility,
} from "@/server/users/users.action";

export const DropDownAction = ({
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
      redirect("/dashboard/links");
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async (shortCode: string) => {
    const result = await handleDeleteAction(shortCode);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard/links");
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
        <Link href={`/dashboard/links/${shortCode}`}>
          <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
            <Link2 size={18} className="text-slate-500" />
            <span className="font-medium text-slate-700">
              View link details
            </span>
          </DropdownMenuItem>
        </Link>

        <Link href={`/dashboard/links/${shortCode}`}>
          <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
            <QrCode size={18} className="text-slate-500" />
            <span className="font-medium text-slate-700">View QR Code</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          className="cursor-pointer gap-3 py-2.5"
          onClick={() => handleHide({ shortCode, currentState })}
        >
          <EyeOff size={18} className="text-slate-500" />
          <span className="font-medium text-slate-700">Hide link</span>
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
