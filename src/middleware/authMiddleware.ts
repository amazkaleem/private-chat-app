import express from "express";
import type { Request, Response, NextFunction } from "express";

// Middleware to protect routes
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    // The user has a valid, unexpired cookie. Let them proceed.
    return next();
  }
  // The user has no cookie (or it expired). Redirect to login.
  res.redirect("/login");
}
