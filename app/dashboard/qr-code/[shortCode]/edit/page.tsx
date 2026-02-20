import { EditQrForm } from "@/components/user/dashboard/Qr-code/EditQrForm";
import { getQrByShortCode } from "@/server/users/users.query";
import { redirect } from "next/navigation";

const QrEditpage = async ({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) => {
  const { shortCode } = await params;

  const qrData = await getQrByShortCode(shortCode);

  if (!qrData) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <EditQrForm initialData={qrData} />
    </div>
  );
};

export default QrEditpage;
