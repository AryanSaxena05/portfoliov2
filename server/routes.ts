import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body using zod schema
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save contact message to storage
      const contact = await storage.createContact(validatedData);
      
      // Return success response
      return res.status(201).json({
        message: "Contact message received successfully",
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.created_at,
        },
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.message,
        });
      }
      
      // Handle other errors
      console.error("Error saving contact form:", error);
      return res.status(500).json({
        message: "An error occurred while processing your request",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
