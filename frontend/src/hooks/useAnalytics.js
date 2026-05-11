import { useCallback, useEffect, useState } from "react";
import { analyticsService } from "../services/analyticsService";
import { getApiErrorMessage } from "../utils/apiError";
import { useToast } from "./useToast";

export function useAnalytics() {
  const { showToast } = useToast();
  const [filters, setFilters] = useState({ dateFrom: "", dateTo: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await analyticsService.summary(filters);
      setData(response.data);
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load analytics.") });
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapAnalytics() {
      try {
        const response = await analyticsService.summary(filters);
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        if (isMounted) {
          showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load analytics.") });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    bootstrapAnalytics();
    return () => {
      isMounted = false;
    };
  }, [filters, showToast]);

  return { filters, setFilters, isLoading, data, reload: loadAnalytics };
}
