import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request data
      const contactData = insertContactSchema.parse(req.body);
      
      // Store the contact submission
      const result = await storage.createContactSubmission(contactData);
      
      res.status(201).json({
        message: "Contact form submitted successfully",
        id: result.id
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Failed to submit contact form"
        });
      }
    }
  });

  // API endpoint to handle newsletter subscriptions
  app.post("/api/newsletter", async (req, res) => {
    try {
      // Validate the request data
      const newsletterData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(newsletterData.email);
      
      if (existingSubscription) {
        if (existingSubscription.active) {
          return res.status(409).json({
            message: "Email is already subscribed to the newsletter"
          });
        } else {
          // Reactivate the subscription
          await storage.updateNewsletterSubscription(existingSubscription.id, { active: true });
          return res.status(200).json({
            message: "Newsletter subscription reactivated successfully"
          });
        }
      }
      
      // Store the new subscription
      const result = await storage.createNewsletterSubscription(newsletterData);
      
      res.status(201).json({
        message: "Newsletter subscription created successfully",
        id: result.id
      });
    } catch (error) {
      console.error("Error creating newsletter subscription:", error);
      
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid subscription data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Failed to create newsletter subscription"
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
