import { carouselService } from "@/modules/carousel/service";
import HomeShell from "@/modules/home/ui/home-shell";

export default async function HomePage() {
  const slides = await carouselService.getPublishedSlides();

  const serializableSlides = slides.map((slide) => ({
    ...slide,
    createdAt: new Date(slide.createdAt).toISOString(),
    updatedAt: new Date(slide.updatedAt).toISOString(),
  }));

  return <HomeShell initialSlides={serializableSlides} />;
}
