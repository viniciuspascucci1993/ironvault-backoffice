export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "MERCHANT";
  active: boolean;
  emailConfirmed: boolean;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "PROCESSING" | "APPROVED" | "FAILED";
  paymentMethod: string;
  description: string;
  externalId: string;
  payerEmail: string;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PageResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface DashboardSummary {
  totalTransactions: number;
  totalUsers: number;
  totalRevenue: number;
  transactionsByStatus: {
    approved: number;
    failed: number;
    processing: number;
  };
  transactionsByChartData: {
    date: string;
    count: number;
  }[];
  revenueByChartData: {
    date: string;
    amount: number;
  }[];
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginLog {
  id: string;
  email: string;
  ip: string;
  userAgent: string;
  success: boolean;
  failureReason: string | null;
  createdAt: string;
}
