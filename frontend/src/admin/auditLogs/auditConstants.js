

export const AUDIT_ACTIONS = [
  { label: "All Actions", value: "" },
  { label: "Create", value: "CREATE" },
  { label: "Update", value: "UPDATE" },
  { label: "Delete", value: "DELETE" },
 
];

export const DEFAULT_PAGE_SIZE = 10;


export const AUDIT_TABLE_COLUMNS = [
  { key: "timestamp", label: "Timestamp" },
  { key: "user", label: "User" },
  { key: "action", label: "Action" },
  { key: "resource", label: "Resource" },
  { key: "details", label: "Details" },
  { key: "ipAddress", label: "IP Address" },
  { key: "actions", label: "Actions" },
];