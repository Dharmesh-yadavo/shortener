import { DetailedQrComp } from "@/components/user/dashboard/Qr-code/DetailedQrComp";
import { getQrByShortCode } from "@/server/users/users.query";
import { redirect } from "next/navigation";

const DetailedQRage = async ({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) => {
  const { shortCode } = await params;

  const qrData = await getQrByShortCode(shortCode);

  if (!qrData) {
    redirect("/");
  }

  return <DetailedQrComp initialData={qrData} />;
};

export default DetailedQRage;
