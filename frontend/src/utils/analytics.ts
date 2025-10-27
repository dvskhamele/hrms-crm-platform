export const logAnalyticsEvent = (eventName: string, payload: any) => {
  const timestamp = new Date().toISOString();
  const logEntry = JSON.stringify({ timestamp, eventName, payload });
  console.log(`ANALYTICS_LOG: ${logEntry}`);
  // In a real application, this would send data to an analytics endpoint
  // For now, we'll simulate appending to a log file by logging to console.
  // If a backend were available, we'd make a fetch request here.
};

export const logToolOpened = (toolSlug: string) => {
  logAnalyticsEvent('ToolOpened', { toolSlug });
};

export const logToolSubmitted = (toolSlug: string, inputData: any) => {
  logAnalyticsEvent('ToolSubmitted', { toolSlug, inputData });
};

export const logToolResultViewed = (toolSlug: string, resultId: string) => {
  logAnalyticsEvent('ToolResultViewed', { toolSlug, resultId });
};

export const logLeadCaptured = (toolSlug: string, email: string, resultId: string) => {
  logAnalyticsEvent('LeadCaptured', { toolSlug, email, resultId });
};