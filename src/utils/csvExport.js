// CSV Export utility for MESSMATE reports

/**
 * Converts an array of objects to CSV formatted string
 * @param {Array<Object>} rows
 * @param {Array<string>} headers
 * @returns {string}
 */
export function convertToCSV(rows, headers) {
  if (!rows || !rows.length) return "";

  const headerRow = headers.map(h => `"${h.replace(/"/g, '""')}"`).join(",");
  const dataRows = rows.map(row => {
    return headers.map(h => {
      const val = row[h] !== undefined && row[h] !== null ? String(row[h]) : "";
      return `"${val.replace(/"/g, '""')}"`;
    }).join(",");
  });

  return [headerRow, ...dataRows].join("\r\n");
}

/**
 * Triggers instant browser download of a CSV file
 * @param {string} csvContent
 * @param {string} filename
 */
export function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports Food Ratings summary CSV
 */
export function exportFoodRatingsCSV(menuItems) {
  const rows = menuItems.map(m => ({
    "Meal ID": m.id,
    "Day": m.day,
    "Meal Slot": m.mealType.toUpperCase(),
    "Dish Name": m.name,
    "Category": m.category,
    "Rating Display": m.ratingCount === 0 ? "Not rated yet | 0 ratings" : `${Number(m.avgRating).toFixed(1)} ★ | ${m.ratingCount} ${m.ratingCount === 1 ? "rating" : "ratings"}`,
    "Average Rating": m.ratingCount === 0 ? "Not rated yet" : m.avgRating,
    "Total Ratings": m.ratingCount || 0,
    "Good Votes (👍)": m.goodVotes || 0,
    "Needs Improvement Votes (👎)": m.badVotes || 0,
    "Taste Score": m.breakdown?.taste || "",
    "Quality Score": m.breakdown?.quality || "",
    "Quantity Score": m.breakdown?.quantity || "",
    "Temperature Score": m.breakdown?.temperature || "",
    "Overall Satisfaction": m.breakdown?.overall || m.avgRating
  }));

  const headers = [
    "Meal ID", "Day", "Meal Slot", "Dish Name", "Category",
    "Rating Display", "Average Rating", "Total Ratings",
    "Good Votes (👍)", "Needs Improvement Votes (👎)",
    "Taste Score", "Quality Score",
    "Quantity Score", "Temperature Score", "Overall Satisfaction"
  ];

  const csv = convertToCSV(rows, headers);
  downloadCSV(csv, `messmate_food_ratings_${new Date().toISOString().split("T")[0]}.csv`);
}

/**
 * Exports Food Waste log CSV
 */
export function exportFoodWasteCSV(wasteRecords) {
  const rows = wasteRecords.map(w => ({
    "Record ID": w.id,
    "Date": w.date,
    "Meal Slot": w.mealType.toUpperCase(),
    "Food Item": w.foodType,
    "Prepared (kg)": w.preparedKg,
    "Served (kg)": w.servedKg,
    "Remaining (kg)": w.remainingKg,
    "Actual Wasted (kg)": w.wastedKg,
    "Wastage %": `${w.wastePercentage}%`,
    "Students Served": w.studentsServed,
    "Reason": w.reason,
    "Recorded By": w.recordedBy
  }));

  const headers = [
    "Record ID", "Date", "Meal Slot", "Food Item", "Prepared (kg)",
    "Served (kg)", "Remaining (kg)", "Actual Wasted (kg)", "Wastage %",
    "Students Served", "Reason", "Recorded By"
  ];

  const csv = convertToCSV(rows, headers);
  downloadCSV(csv, `messmate_food_waste_audit_${new Date().toISOString().split("T")[0]}.csv`);
}

/**
 * Exports Anonymous Student Feedback CSV (CRITICAL: Anonymous Only)
 */
export function exportAnonymousFeedbackCSV(feedbackLogs) {
  const rows = feedbackLogs.map(fb => ({
    "Anonymous ID": fb.id,
    "Meal Name": fb.mealName,
    "Meal Category": fb.mealCategory,
    "Overall Rating (Stars)": fb.overallRating,
    "Reported Issues / Reasons": (fb.selectedReasons || []).join("; "),
    "Student Feedback": fb.studentFeedback,
    "Constructive Suggestion": fb.constructiveSuggestion,
    "Submission Timestamp": fb.timestamp
  }));

  const headers = [
    "Anonymous ID", "Meal Name", "Meal Category", "Overall Rating (Stars)",
    "Reported Issues / Reasons", "Student Feedback", "Constructive Suggestion", "Submission Timestamp"
  ];

  const csv = convertToCSV(rows, headers);
  downloadCSV(csv, `messmate_anonymous_feedback_logs_${new Date().toISOString().split("T")[0]}.csv`);
}

/**
 * Exports Cleanliness & Hygiene Reports CSV
 */
export function exportCleanlinessReportsCSV(reports) {
  const rows = reports.map(r => ({
    "Report ID": r.id,
    "Anonymous Feedback Ref": r.feedbackId,
    "Issue Category": r.issueType,
    "Location": r.location,
    "Severity": r.severity,
    "Current Status": r.status,
    "Issue Description": r.description,
    "Reported At": r.timestamp,
    "Admin Corrective Action": r.adminNotes,
    "Resolved At": r.resolvedAt || "Unresolved"
  }));

  const headers = [
    "Report ID", "Anonymous Feedback Ref", "Issue Category", "Location",
    "Severity", "Current Status", "Issue Description", "Reported At",
    "Admin Corrective Action", "Resolved At"
  ];

  const csv = convertToCSV(rows, headers);
  downloadCSV(csv, `messmate_hygiene_inspections_${new Date().toISOString().split("T")[0]}.csv`);
}
