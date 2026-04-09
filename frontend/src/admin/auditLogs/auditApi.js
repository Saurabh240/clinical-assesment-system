import api from "../../api/axios";

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
        page: page - 1,   // Backend uses 0-based (Spring PageRequest), frontend uses 1-based
        size: pageSize,   // Backend @RequestParam is "size", not "pageSize"
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