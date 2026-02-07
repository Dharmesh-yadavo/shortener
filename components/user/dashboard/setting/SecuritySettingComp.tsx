"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  updatePasswordSchema,
  UpdatePasswordData,
} from "@/server/users/users.schema";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  deleteAccountAction,
  updatePasswordAction,
} from "@/server/users/users.action";
import { redirect } from "next/navigation";

export const SecuritySettingComp = ({ userId }: { userId: number }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onUpdatePassword = async (data: UpdatePasswordData) => {
    const res = await updatePasswordAction({ data, userId });
    if (res.status === "success") {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.message);
    }
  };

  const onDeleteAccount = async () => {
    if (confirm("Are you sure? This cannot be undone.")) {
      const res = await deleteAccountAction(userId);
      if (res.status === "success") {
        redirect("/login");
      }
    }
  };

  return (
    <TabsContent value="security" className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit(onUpdatePassword)}>
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-xl font-bold">Update Password</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Current Password</Label>
              <Input
                type="password"
                {...register("currentPassword")}
                className={errors.currentPassword ? "border-red-500" : ""}
              />
              {errors.currentPassword && (
                <span className="text-xs text-red-500">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">New Password</Label>
                <Input
                  type="password"
                  {...register("newPassword")}
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                {errors.newPassword && (
                  <span className="text-xs text-red-500">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Confirm New Password</Label>
                <Input
                  type="password"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t py-4">
            <Button
              disabled={isSubmitting}
              className="bg-slate-900 font-bold px-8"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="border-red-200 bg-red-50/50 shadow-none">
        <CardHeader>
          <CardTitle className="text-red-600 font-black flex items-center gap-2">
            <Trash2 size={20} /> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600/80 font-medium">
            Permanently remove your account and all data.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={onDeleteAccount}
            variant="destructive"
            className="font-bold px-8"
          >
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
