import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { ZodError } from "zod";
import { insertCallBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
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
  app.post("/api/book-call", async (req, res) => {
    try {
      const bookingData = insertCallBookingSchema.parse(req.body);
  
      const result = await storage.createCallBooking(bookingData);
  
      res.status(201).json({
        message: "Booking successful",
        id: result.id,
      });
    } catch (error) {
      console.error("Error booking call:", error);
  
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid booking data",
          errors: error.errors,
        });
      } else {
        res.status(500).json({ message: "Failed to book call" });
      }
    }
  });
  app.get("/api/bookings", async (req, res) => {
    const token = req.headers["authorization"];
  
    if (token !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const bookings = await storage.getAllCallBookings();
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  

  // API endpoint to handle newsletter subscriptions
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(newsletterData.email);
      if (existingSubscription) {
        if (existingSubscription.active) {
          return res.status(409).json({
            message: "Email is already subscribed to the newsletter"
          });
        } else {
          await storage.updateNewsletterSubscription(existingSubscription.id, { active: true });
          return res.status(200).json({
            message: "Newsletter subscription reactivated successfully"
          });
        }
      }
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

  // API endpoint to fetch contact messages (for admin panel)
  app.get("/api/messages", async (req, res) => {
    const token = req.headers["authorization"];
  
    if (token !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const messages = await storage.getAllContactSubmissions();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });
    // API endpoint to fetch newsletter subscribers (for admin panel)
    app.get("/api/newsletter-subscribers", async (req, res) => {
      const token = req.headers["authorization"];
  
      if (token !== `Bearer ${process.env.ADMIN_TOKEN}`) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      try {
        const subscribers = await storage.getAllNewsletterSubscribers();
        res.status(200).json(subscribers);
      } catch (error) {
        console.error("Error fetching newsletter subscribers:", error);
        res.status(500).json({ message: "Failed to fetch newsletter subscribers" });
      }
    });
  

  const httpServer = createServer(app);
  return httpServer;
}