

import api from "@/auditApi"; 

export const fetchAuditLogs = async ({
  page = 1,
  pageSize = 10,
  search = "",
  action = "",
  startDate = "",
  endDate = "",
}) => {
  try {
    const response = await api.get("/admin/audit-logs", {
      params: {
        page,
        pageSize,
        search,
        action,
        startDate,
        endDate,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
};