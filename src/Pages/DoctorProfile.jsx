import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../Context/AuthContext"; // Assuming you have a user context
import { toast } from "sonner";

export default function DoctorProfile() {
  const { user } = useAuth(); // Fetch the logged-in doctor's data

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name:  "",
    email: "",
    // specialization: user?.specialization || "",
    // location: user?.location || "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.userName || "",
        email: user.email || "",
        // phone: user.phoneNumber || "",
        // specialization: user.specialization || "",
        // location: user.location || "",
      });
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;

  const firstLetter = user.userName ? user.userName.charAt(0).toUpperCase() : "D";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Here you would send updated info to your backend
    console.log("Saving updated profile:", form);
  
    toast.success('Profile updated successfully 🎉', {
      style: {
        background: '#ffffff',
        border: '1px solid #dfe6dc',
        color: '#2d3e2f',
        padding: '16px',
        fontSize: '16px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      },
      duration: 3000, // 3 seconds
      position: 'top-center',
    });
  
    setIsOpen(false); // Close the modal
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9fafb] pt-10">
      <Card className="w-full max-w-2xl border border-gray-200 shadow-md p-8">
        <div className="flex flex-col items-center gap-4">
          {/* Circle Avatar */}
          <div className="w-24 h-24 rounded-full bg-[#749260] flex items-center justify-center text-white text-4xl font-bold shadow-md">
            {firstLetter}
          </div>

          {/* Profile Info */}
          <h2 className="text-2xl font-semibold text-[#2d3e2f]">{user.userName}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">{user.phoneNumber || "No phone number"}</p>

          {/* Edit Button */}
          <Button onClick={() => setIsOpen(true)} className="mt-6 bg-[#749260] hover:bg-[#5c7b4e] text-white">
            Edit Profile
          </Button>
        </div>

        {/* More Details */}
        <CardContent className="mt-8">
          <h3 className="text-lg font-semibold text-[#2d3e2f] mb-4">Details</h3>
          <div className="grid grid-cols-1 gap-4 text-gray-600">
            <div>
              <strong>Specialization:</strong> {user.specialization || "General Doctor"}
            </div>
            <div>
              <strong>Experience:</strong> {user.experience ? `${user.experience} years` : "Not provided"}
            </div>
            <div>
              <strong>Location:</strong> {user.location || "Not provided"}
            </div>
          </div>
        </CardContent>
      </Card>

     {/* New Custom Edit Modal */}
{isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
      
      <h2 className="text-2xl font-semibold text-[#2d3e2f] mb-6 text-center">
        Edit Profile
      </h2>

      <form className="grid grid-cols-1 gap-5">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#749260]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#749260]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#749260]"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-[#749260] hover:bg-[#5c7b4e] text-white font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Close button on top right */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
      >
        &times;
      </button>

    </div>
  </div>
)}

    </div>
  );
}
