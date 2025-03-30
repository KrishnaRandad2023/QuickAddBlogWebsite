import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContact,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  
  // Newsletter methods
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<NewsletterSubscription>;
  getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  updateNewsletterSubscription(id: number, updates: Partial<NewsletterSubscription>): Promise<NewsletterSubscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private userCurrentId: number;
  private contactCurrentId: number;
  private newsletterCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form methods
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const contact: ContactSubmission = { ...insertContact, id, createdAt };
    this.contactSubmissions.set(id, contact);
    return contact;
  }
  
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  // Newsletter methods
  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<NewsletterSubscription> {
    const id = this.newsletterCurrentId++;
    const createdAt = new Date();
    const active = true;
    const subscription: NewsletterSubscription = { ...insertNewsletter, id, createdAt, active };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  
  async getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined> {
    return this.newsletterSubscriptions.get(id);
  }
  
  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }
  
  async updateNewsletterSubscription(id: number, updates: Partial<NewsletterSubscription>): Promise<NewsletterSubscription> {
    const subscription = this.newsletterSubscriptions.get(id);
    if (!subscription) {
      throw new Error(`Newsletter subscription with ID ${id} not found`);
    }
    
    const updatedSubscription = { ...subscription, ...updates };
    this.newsletterSubscriptions.set(id, updatedSubscription);
    return updatedSubscription;
  }
}

export const storage = new MemStorage();
