"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ShieldCheck, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { setLinkPasswordAction } from "@/server/users/users.action";
import { PasswordFormData, passwordSchema } from "@/server/users/users.schema";

export const PasswordModal = ({
  shortCode,
  hasPassword,
}: {
  shortCode: string;
  hasPassword: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    const result = await setLinkPasswordAction(shortCode, data.password);

    if (result.status === "success") {
      toast.success(result.message);
      setOpen(false);
      form.reset();
    } else {
      toast.error(result.message);
    }
  };

  const handleRemove = async () => {
    setIsDeleting(true);
    const result = await setLinkPasswordAction(shortCode, null);
    if (result.status === "success") {
      toast.success("Password removed. Link is now public.");
      setOpen(false);
      form.reset();
    }
    setIsDeleting(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-9 font-bold border-slate-200 rounded-lg uppercase text-[9px] tracking-widest hover:bg-slate-50"
        >
          {hasPassword ? "Change Password" : "Set Password"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {hasPassword ? (
                  <ShieldCheck className="text-amber-500" />
                ) : (
                  <Lock className="text-blue-500" />
                )}
                {hasPassword ? "Update Security" : "Protect your link"}
              </DialogTitle>
              <DialogDescription>
                {hasPassword
                  ? "Enter a new password or remove the current one."
                  : "Set a password to restrict access to this link."}
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-slate-500">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
              {hasPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  className="sm:mr-auto text-red-500 hover:text-red-600 hover:bg-red-50 font-bold text-[10px] uppercase"
                  onClick={handleRemove}
                  disabled={form.formState.isSubmitting || isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <Trash2 size={14} className="mr-2" />
                  )}
                  Remove
                </Button>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isDeleting}
                className="bg-blue-600 hover:bg-blue-700 font-bold"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {hasPassword ? "Update" : "Save Password"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
