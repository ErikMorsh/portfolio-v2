/** Google Analytics 4 measurement ID (G-XXXXXXXX). Empty when unset. */
export function getGaMeasurementId(): string {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? ''
}

/** GA loads only in production builds when a measurement ID is set. */
export function isAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === 'production' && getGaMeasurementId().length > 0
}
