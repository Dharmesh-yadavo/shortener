// app/dashboard/links/page.tsx (Server Component)
import { LinkLibrary } from "@/components/user/dashboard/links/LinkLibrary";
import { getUserLinks } from "@/server/users/users.query";

export default async function Page() {
  const links = await getUserLinks({ limit: 10 });

  return <LinkLibrary links={links} />;
}
