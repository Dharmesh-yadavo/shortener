import QrGallery from "@/components/user/dashboard/Qr-code/QrGallery";
import { getAllQr } from "@/server/users/users.query";

const Qrpage = async () => {
  const qrs = await getAllQr();
  if (!qrs) return [];

  return <QrGallery qrs={qrs} />;
};

export default Qrpage;
