import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
  title?: string;
}

export function ErrorPage({
  statusCode = 404,
  message,
  title,
}: ErrorPageProps) {
  let defaultTitle: string;
  let defaultMessage: string;

  switch (statusCode) {
    case 403:
      defaultTitle = "Access Denied";
      defaultMessage =
        "You do not have permission to access this resource. Please contact an administrator if you believe this is an error.";
      break;
    case 404:
      defaultTitle = "Page Not Found";
      defaultMessage =
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
      break;
    case 500:
      defaultTitle = "Internal Server Error";
      defaultMessage =
        "Something went wrong on our server. Please try again later or contact support.";
      break;
    default:
      defaultTitle = "An Unexpected Error Occurred";
      defaultMessage =
        "We're sorry, but something unexpected happened. Please try again later.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <h1 className="text-9xl font-extrabold text-primary mb-4">
        {statusCode}
      </h1>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        {title || defaultTitle}
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-8">
        {message || defaultMessage}
      </p>
      <Link to="/">
        <Button size="lg">Go to Homepage</Button>
      </Link>
    </div>
  );
}
