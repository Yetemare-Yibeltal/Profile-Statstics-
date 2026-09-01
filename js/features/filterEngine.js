/**
 * Filter engine to slice analytics datasets by custom time frames
 */

export const filterDataByRange = (dataPoints, rangeKey) => {
  const now = new Date();
  let daysLimit = 7;

  if (rangeKey === "30d") daysLimit = 30;
  if (rangeKey === "90d") daysLimit = 90;
  if (rangeKey === "1y") daysLimit = 365;

  return dataPoints.slice(-daysLimit);
};
