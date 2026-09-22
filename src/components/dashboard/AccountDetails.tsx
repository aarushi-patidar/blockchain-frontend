"use client";

import React, { useState } from "react";

const AccountDetails: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "Kevin Gilbert",
    email: "kevin.gilbert@gmail.com",
    altEmail: "kevin0244@gmail.com",
    phone: "+1-202-555-0118",
    country: "Bangladesh",
    city: "Dhaka",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAccount = () => {
    console.log("Updating account with:", formData);
    // Add your update logic here
  };

  const handleChangePassword = () => {
    console.log("Changing password with:", passwordData);
    // Add your password change logic here
  };

  return (
    <div className="w-full ">
      <h2 className="font-avant text-center mt-7 text-2xl text-white font-semibold mb-6">
        Account Details
      </h2>

      <div className="shadow mx-auto border-black rounded-2xl p-8 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Alternative Email
            </label>
            <input
              type="email"
              name="altEmail"
              value={formData.altEmail}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <button
            onClick={handleUpdateAccount}
            className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-avant font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Update Account
          </button>
        </div>
      </div>

      <div className="shadow mx-auto border-black rounded-2xl p-8 max-w-2xl mt-8">
        <h3 className="font-avant text-xl text-white font-semibold mb-6">
          Change Password
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-avant font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
