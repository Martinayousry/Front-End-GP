// src/pages/AddClinic.jsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner';

export default function AddClinic() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    locationUrl: "",
    details: "",
    number: "",
    cLinicEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/Clinic", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.custom((t) => (
        <div className="w-[400px] bg-white shadow-xl border border-[#dfe6dc] rounded-2xl p-5 flex items-start gap-4 animate-in slide-in-from-right duration-500">
          <div className="text-3xl text-[#749260]">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-[#2d3e2f]">Clinic Created</p>
            <p className="text-sm text-gray-600">
              Your clinic has been successfully added.
            </p>
          </div>
          <button
            onClick={() => {
              toast.dismiss(t);
              navigate("/doctor/clinics"); // Consistent navigation
            }}
            className="ml-auto text-sm text-[#749260] font-medium hover:underline"
          >
            View
          </button>
        </div>
      ));
      
      // Navigate after 1 second (same as in toast)
      setTimeout(() => navigate("/doctor/clinics"), 1000);
    } catch (error) {
      console.error("Error adding clinic:", error);
      toast.error("Failed to add clinic. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] py-10 mt-11">
      <Card className="w-full max-w-3xl border border-gray-200 shadow-md ">
        <div className="grid place-items-center">
          <span className="text-gray-400 italic text-sm">
            <i className="fa-solid fa-paw text-4xl"></i>
          </span>
        </div>
        <CardContent className="p-8 py-2">
          <h2 className="text-2xl font-semibold text-[#2d3e2f] mb-6">
            Add New Clinic
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-500"
          >
            <div>
              <Label htmlFor="name" className='mb-2'>Clinic Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="cLinicEmail" className='mb-2'>Clinic Email</Label>
              <Input
                name="cLinicEmail"
                type="email"
                value={form.cLinicEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="number" className='mb-2'>Clinic Phone Number</Label>
              <Input
                name="number"
                type="tel"
                value={form.number}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="locationUrl" className='mb-2'>Google Maps URL</Label>
              <Input
                name="locationUrl"
                type="url"
                value={form.locationUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address" className='mb-2'>Clinic Address</Label>
              <Textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="details" className='mb-2'>Clinic Description</Label>
              <Textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div className="md:col-span-2 flex justify-between items-center mt-2">
              <Button
                type="submit"
                className="bg-[#749260] hover:bg-[#5c7b4e] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Clinic"}
                <i className="fa-solid fa-house-chimney-medical ml-2"></i>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}