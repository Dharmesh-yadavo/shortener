"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ProfileSettingsData,
  profileSettingsSchema,
} from "@/server/users/users.schema";
import { profileSettingAction } from "@/server/users/users.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type UserData = {
  id: number;
  name: string;
  email: string;
};

export const ProfileSettingComp = ({ user }: { user: UserData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSettingsData>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data: ProfileSettingsData) => {
    const result = await profileSettingAction({ data, userId: user.id });
    if (result.status === "success") {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <TabsContent value="profile">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-xl font-bold">Public Profile</CardTitle>
            <CardDescription>
              Update your name and email address.
            </CardDescription>
          </CardHeader>

          <CardContent className=" space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="font-bold text-slate-700">
                  Name
                </Label>
                <Input
                  {...register("name")}
                  className={
                    errors.name
                      ? "border-red-500 font-sans"
                      : "border-slate-200 font-sans"
                  }
                />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="font-bold text-slate-700">
                  Email Address
                </Label>
                <Input
                  {...register("email")}
                  className={
                    errors.email
                      ? "border-red-500 font-sans"
                      : "border-slate-200 font-sans"
                  }
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t py-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 font-bold font-sans px-8"
            >
              {isSubmitting ? "Saving..." : "Save Profile Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};
