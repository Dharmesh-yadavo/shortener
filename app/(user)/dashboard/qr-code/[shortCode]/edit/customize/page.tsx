import { CustomizeQrForm } from "@/components/user/dashboard/Qr-code/CustomizeQrForm";
import { getQrByShortCode } from "@/server/users/users.query";
import { redirect } from "next/navigation";

const QrCustomizepage = async ({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) => {
  const { shortCode } = await params;

  const qrData = await getQrByShortCode(shortCode);

  if (!qrData) {
    redirect("/");
  }

  return <CustomizeQrForm initialData={qrData} />;
};

export default QrCustomizepage;
