import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/features/auth/server/auth.action";
import { getCurrentUser } from "@/features/auth/server/auth.queries";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <h1>Hello Everyone</h1>
      <p>{user?.name}</p>
      <Button variant="outline" onClick={logoutUserAction}>
        Log Out{" "}
      </Button>
    </>
  );
}
