import { prisma } from "@/shared/lib/prisma";

export const adminRepo = {
  async isAdminEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const admin = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
    return Boolean(admin);
  },
};
