import { AdminUserService } from "../../services/admin/user.service";
import { Request, Response } from "express";

let adminUserService = new AdminUserService();

export class AdminUserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await adminUserService.getAllUsers();
      return res.status(200).json({
        success: true,
        data: users,
        message: "all users fetched successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "internal server error",
      });
    }
  }
}
