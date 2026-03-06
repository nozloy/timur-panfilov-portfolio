import { adminRepo } from "@/modules/auth/admin-repo";

export const adminService = {
  async assertAdmin(email: string) {
    if (!email) {
      return false;
    }

    return adminRepo.isAdminEmail(email);
  },
};
