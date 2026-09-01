/**
 * Packages full portfolio summary stats for offline review
 */

import { exportToJSON } from "../services/exportService.js";
import { showToast } from "./toast.js";

export const handlePortfolioExport = (profileData) => {
  exportToJSON("metages_portfolio_export.json", profileData);
  showToast("Portfolio snapshot successfully exported!", "success");
};
