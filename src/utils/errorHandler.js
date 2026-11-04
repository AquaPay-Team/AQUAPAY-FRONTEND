/**
 * Centralized API Error Parser for AquaPay
 * Handles Network errors, Server 500s, 401 Auth failures, 429 Rate limits, and Validation errors.
 */

export function parseApiError(err) {
  // 1. Network / Offline / Server Unreachable Error
  if (!err?.response) {
    if (err?.code === "ERR_NETWORK" || err?.message === "Network Error") {
      return {
        type: "NETWORK_ERROR",
        title: "Network Connection Failed",
        message:
          "Unable to connect to AquaPay servers. Please check your internet connection or verify the backend service is running.",
      };
    }

    if (err?.code === "ECONNABORTED" || err?.message?.includes("timeout")) {
      return {
        type: "TIMEOUT_ERROR",
        title: "Request Timed Out",
        message:
          "The server took too long to respond. Please check your connection and try again.",
      };
    }

    return {
      type: "NETWORK_ERROR",
      title: "Connection Error",
      message:
        err?.message ||
        "A network communication error occurred. Please verify your connection.",
    };
  }

  const { status, data } = err.response;
  const backendMessage = data?.message;
  const backendCode = data?.code;

  // 2. Authentication Failures (401)
  if (status === 401 || backendCode === "AUTH_FAILED" || backendCode === "UNAUTHORIZED") {
    return {
      type: "AUTH_FAILED",
      title: "Authentication Failed",
      message:
        backendMessage ||
        "The username, email, or password you entered is incorrect. Please verify and try again.",
    };
  }

  // 3. Forbidden / Account Status Issues (403)
  if (status === 403 || backendCode === "FORBIDDEN") {
    return {
      type: "FORBIDDEN",
      title: "Access Restricted",
      message:
        backendMessage ||
        "Your account is inactive, suspended, or does not have permission to perform this action.",
    };
  }

  // 4. Rate Limiting (429)
  if (status === 429 || backendCode === "RATE_LIMIT_EXCEEDED") {
    return {
      type: "RATE_LIMIT",
      title: "Too Many Attempts",
      message:
        backendMessage ||
        "Too many requests have been made from this device or account. Please wait a few moments before trying again.",
    };
  }

  // 5. Server Errors (500, 502, 503, 504)
  if (status >= 500) {
    if (status === 503 || backendCode === "SERVICE_UNAVAILABLE") {
      return {
        type: "SERVICE_UNAVAILABLE",
        title: "Service Temporarily Unavailable",
        message:
          "AquaPay banking services are undergoing routine maintenance. Please try again shortly.",
      };
    }

    return {
      type: "SERVER_ERROR",
      title: "Server Problem",
      message:
        "Our backend encountered an unexpected error. Our engineering team has been notified. Please try again later.",
    };
  }

  // 6. Validation / Bad Request Errors (400, 422)
  if (status === 400 || status === 422 || backendCode === "VALIDATION_ERROR") {
    return {
      type: "VALIDATION_ERROR",
      title: "Invalid Information",
      message:
        backendMessage ||
        "The submitted information is invalid. Please double check all fields.",
    };
  }

  // 7. Not Found (404)
  if (status === 404) {
    return {
      type: "NOT_FOUND",
      title: "Not Found",
      message: backendMessage || "The requested resource could not be found.",
    };
  }

  // Fallback Generic
  return {
    type: "GENERIC_ERROR",
    title: "Something Went Wrong",
    message: backendMessage || err.message || "An unexpected error occurred. Please try again.",
  };
}

