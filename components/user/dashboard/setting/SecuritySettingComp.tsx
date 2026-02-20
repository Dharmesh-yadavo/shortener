"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { Trash2, LockKeyhole, ShieldCheck } from "lucide-react";
import { updatePasswordAction } from "@/server/users/users.action";
import {
  UpdatePasswordData,
  updatePasswordSchema,
} from "@/server/users/users.schema";

export const SecuritySettingComp = ({
  userId,
  password,
}: {
  userId: number;
  password: string | null;
}) => {
  // Logic to determine if user needs to "Set" or "Update"
  const isFirstTime = !password || password === "";

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
      // Optionally trigger a page refresh to update the 'password' prop state
    } else {
      toast.error(res.message);
    }
  };

  return (
    <TabsContent value="security" className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit(onUpdatePassword)}>
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              {isFirstTime ? (
                <>
                  <LockKeyhole className="text-blue-600" size={22} /> Set
                  Account Password
                </>
              ) : (
                <>
                  <ShieldCheck className="text-green-600" size={22} /> Update
                  Password
                </>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-8 space-y-6">
            {/* ONLY show Current Password if they actually HAVE a password */}
            {!isFirstTime && (
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Current Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your old password"
                  {...register("currentPassword")}
                  className={errors.currentPassword ? "border-red-500" : ""}
                />
                {errors.currentPassword && (
                  <span className="text-xs text-red-500">
                    {errors.currentPassword.message}
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">New Password</Label>
                <Input
                  type="password"
                  placeholder="At least 8 characters"
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
                  placeholder="Repeat new password"
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
              {isSubmitting
                ? "Processing..."
                : isFirstTime
                  ? "Create Password"
                  : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-100 bg-red-50/30 shadow-none">
        <CardHeader>
          <CardTitle className="text-red-600 font-black flex items-center gap-2">
            <Trash2 size={20} /> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600/80 font-medium">
            Deleting your account will remove all your data from{" "}
            <strong>Skillera</strong> and <strong>Shorten.io</strong>.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="font-bold px-8">
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
