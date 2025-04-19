import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-aes-navy mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-aes-gray mb-12">
              Have questions about our services? We're here to help. Fill out the form below
              and we'll get back to you as soon as possible.
            </p>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Enter your company name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this regarding?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className="min-h-[150px]"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-aes-navy mb-4">
                  Office Location
                </h3>
                <p className="text-aes-gray">
                  123 Business Street<br />
                  Suite 456<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-aes-navy mb-4">
                  Contact Information
                </h3>
                <p className="text-aes-gray">
                  Email: contact@aesfin.ai<br />
                  Phone: +1 (555) 123-4567<br />
                  Hours: Monday - Friday, 9am - 5pm PST
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage; 