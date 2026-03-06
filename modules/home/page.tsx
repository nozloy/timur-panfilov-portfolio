import { carouselService } from "@/modules/carousel/service";
import HomeShell from "@/modules/home/ui/home-shell";

export default async function HomePage() {
  let slides = [] as Awaited<ReturnType<typeof carouselService.getPublishedSlides>>;

  try {
    slides = await carouselService.getPublishedSlides();
  } catch (error) {
    // Keep homepage available even if DB is temporarily unavailable.
    console.error("Failed to load carousel slides on homepage:", error);
  }

  const serializableSlides = slides.map((slide) => ({
    ...slide,
    createdAt: new Date(slide.createdAt).toISOString(),
    updatedAt: new Date(slide.updatedAt).toISOString(),
  }));

  return <HomeShell initialSlides={serializableSlides} />;
}
