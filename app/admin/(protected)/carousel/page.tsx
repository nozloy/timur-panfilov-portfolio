import AdminCarouselClient from "@/modules/carousel/ui/admin-carousel-client";
import { carouselService } from "@/modules/carousel/service";

export const dynamic = "force-dynamic";

export default async function AdminCarouselPage() {
  const slides = await carouselService.getAllSlides();

  const serializableSlides = slides.map((slide) => ({
    ...slide,
    createdAt: new Date(slide.createdAt).toISOString(),
    updatedAt: new Date(slide.updatedAt).toISOString(),
  }));

  return <AdminCarouselClient initialSlides={serializableSlides} />;
}
