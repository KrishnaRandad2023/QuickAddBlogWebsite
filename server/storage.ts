import {
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContact,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletter,
  callBookings, type CallBooking, type InsertCallBooking
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export async function getAllContactSubmissions() {
  return db.select().from(contactSubmissions);
}

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact form methods
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  // Newsletter methods
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<NewsletterSubscription>;
  getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  updateNewsletterSubscription(id: number, updates: Partial<NewsletterSubscription>): Promise<NewsletterSubscription>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscription[]>; // ✅ NEW

  createCallBooking(booking: InsertCallBooking): Promise<CallBooking>;
  getAllCallBookings(): Promise<CallBooking[]>;

}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Contact form methods
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertContact).returning();
    return submission;
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions);
  }

  // Newsletter methods
  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<NewsletterSubscription> {
    const [subscription] = await db.insert(newsletterSubscriptions).values(insertNewsletter).returning();
    return subscription;
  }

  async getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.id, id));
    return subscription;
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return subscription;
  }

  async updateNewsletterSubscription(id: number, updates: Partial<NewsletterSubscription>): Promise<NewsletterSubscription> {
    const [subscription] = await db
      .update(newsletterSubscriptions)
      .set(updates)
      .where(eq(newsletterSubscriptions.id, id))
      .returning();

    if (!subscription) {
      throw new Error(`Newsletter subscription with ID ${id} not found`);
    }

    return subscription;
  }

  // ✅ NEW: Fetch all newsletter subscribers
  async getAllNewsletterSubscribers(): Promise<NewsletterSubscription[]> {
    return db.select().from(newsletterSubscriptions);
  }
  async createCallBooking(booking: InsertCallBooking): Promise<CallBooking> {
    const [created] = await db.insert(callBookings).values(booking).returning();
    return created;
  }
  
  async getAllCallBookings(): Promise<CallBooking[]> {
    return db.select().from(callBookings);
  }
  
}

export const storage = new DatabaseStorage();
