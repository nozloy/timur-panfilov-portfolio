import MiniOgPage from "@/modules/home/ui/mini-og-page";
import { siteContent } from "@/content/siteContent";

export default function MiniPage() {
  return <MiniOgPage content={siteContent.ru} />;
}
