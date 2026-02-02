// import { getCurrentUser } from "@/features/auth/server/auth.queries";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getCurrentUser();

  // console.log(user);

  return <>{children}</>;
}
