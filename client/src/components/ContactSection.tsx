import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactFormSchema } from "@/lib/validation";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from "lucide-react";
import { SiKaggle } from "react-icons/si";
import ParallaxGradientBackground from "./ParallaxGradientBackground";

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      setIsSuccess(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <ParallaxGradientBackground>
      <section 
        id="contact" 
        ref={sectionRef}
        className="py-20 opacity-0 translate-y-5 transition-all duration-700 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-['Press_Start_2P'] mb-4 text-[#0D1B2A] drop-shadow-[0_2px_2px_rgba(13,27,42,0.1)]">Get In Touch</h2>
              <p className="max-w-2xl mx-auto text-[#0D1B2A]/70 text-sm">
                Have a project in mind or want to collaborate? Feel free to reach out!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              <div className="md:col-span-2 space-y-8">
                <div className="bg-[#0D1B2A] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <h3 className="text-xl font-['Press_Start_2P'] mb-4 text-[#FFB71F] text-sm">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="text-[#FFB71F] mt-1 mr-4">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-['Press_Start_2P'] text-xs text-[#FFB71F]">Email</p>
                        <a href="mailto:aryan.saxena2002@gmail.com" className="text-[#89CFF0] hover:text-[#FFB71F] transition-colors text-sm">
                          aryan.saxena2002@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-[#FFB71F] mt-1 mr-4">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-['Press_Start_2P'] text-xs text-[#FFB71F]">Phone</p>
                        <a href="tel:+17657757415" className="text-[#89CFF0] hover:text-[#FFB71F] transition-colors text-sm">
                          +1 (765) 775-7415
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-[#FFB71F] mt-1 mr-4">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-['Press_Start_2P'] text-xs text-[#FFB71F]">Location</p>
                        <p className="text-[#89CFF0] text-sm">West Lafayette, IN</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#0D1B2A] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <h3 className="text-xl font-['Press_Start_2P'] mb-6 text-[#FFB71F] text-sm">Connect</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.linkedin.com/in/aryan-saxena-7726b1218/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-110"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://github.com/AryanSaxena05" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white flex items-center justify-center hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-110"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://www.kaggle.com/aryansaxena2002" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <SiKaggle className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://www.instagram.com/_notaryansaxena_/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-white flex items-center justify-center hover:from-pink-600 hover:via-purple-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="bg-[#0D1B2A] rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#FFB71F] font-['Press_Start_2P'] text-xs">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                                className="bg-[#0D1B2A]/80 border-[#89CFF0] text-[#89CFF0] placeholder:text-[#89CFF0]/50 focus:ring-2 focus:ring-[#FFB71F]/50 transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#FFB71F] font-['Press_Start_2P'] text-xs">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email address" 
                                {...field} 
                                className="bg-[#0D1B2A]/80 border-[#89CFF0] text-[#89CFF0] placeholder:text-[#89CFF0]/50 focus:ring-2 focus:ring-[#FFB71F]/50 transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#FFB71F] font-['Press_Start_2P'] text-xs">Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Subject" 
                                {...field} 
                                className="bg-[#0D1B2A]/80 border-[#89CFF0] text-[#89CFF0] placeholder:text-[#89CFF0]/50 focus:ring-2 focus:ring-[#FFB71F]/50 transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#FFB71F] font-['Press_Start_2P'] text-xs">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your message" 
                                className="min-h-[120px] bg-[#0D1B2A]/80 border-[#89CFF0] text-[#89CFF0] placeholder:text-[#89CFF0]/50 focus:ring-2 focus:ring-[#FFB71F]/50 transition-all duration-300" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full font-['Press_Start_2P'] text-xs bg-[#FFB71F] text-[#0D1B2A] hover:bg-[#FFB71F]/90 transition-all duration-300 transform hover:scale-[1.02] border-2 border-[#0D1B2A] shadow-[4px_4px_0px_#0D1B2A]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                  
                  {isSuccess && (
                    <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg animate-pulse">
                      <p className="font-medium">Thank you for your message!</p>
                      <p>I'll get back to you as soon as possible.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ParallaxGradientBackground>
  );
}
