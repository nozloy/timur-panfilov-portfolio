import { prisma } from "@/shared/lib/prisma";
import type { Prisma } from "@prisma/client";

export const carouselRepo = {
  async getPublishedSlides() {
    return prisma.carouselSlide.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
  },

  async getAllSlides() {
    return prisma.carouselSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },

  async getSlideById(id: string) {
    return prisma.carouselSlide.findUnique({ where: { id } });
  },

  async getMaxSortOrder() {
    const result = await prisma.carouselSlide.aggregate({
      _max: { sortOrder: true },
    });

    return result._max.sortOrder ?? 0;
  },

  async createSlide(data: Prisma.CarouselSlideUncheckedCreateInput) {
    return prisma.carouselSlide.create({ data });
  },

  async updateSlide(id: string, data: Prisma.CarouselSlideUncheckedUpdateInput) {
    return prisma.carouselSlide.update({
      where: { id },
      data,
    });
  },

  async deleteSlide(id: string) {
    return prisma.carouselSlide.delete({ where: { id } });
  },

  async reorderSlides(slideIds: string[]) {
    return prisma.$transaction(
      slideIds.map((id, index) =>
        prisma.carouselSlide.update({
          where: { id },
          data: { sortOrder: index + 1 },
        }),
      ),
    );
  },
};
