import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="font-avant text-2xl text-white font-semibold mb-6">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="shadow border-black rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-lg bg-cyan-400/20 flex items-center justify-center mb-4">
            <Mail className="w-7 h-7 text-cyan-400" />
          </div>
          <h3 className="font-avant text-white font-semibold mb-2">Email</h3>
          <p className="text-gray-400">support@voltage-chain.com</p>
          <p className="text-gray-400">info@voltage-chain.com</p>
        </div>

        <div className="shadow border-black rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-lg bg-cyan-400/20 flex items-center justify-center mb-4">
            <Phone className="w-7 h-7 text-cyan-400" />
          </div>
          <h3 className="font-avant text-white font-semibold mb-2">Phone</h3>
          <p className="text-gray-400">+1-800-VOLTAGE</p>
          <p className="text-gray-400">+1-800-123-4567</p>
        </div>

        <div className="shadow border-black rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-lg bg-cyan-400/20 flex items-center justify-center mb-4">
            <MapPin className="w-7 h-7 text-cyan-400" />
          </div>
          <h3 className="font-avant text-white font-semibold mb-2">Address</h3>
          <p className="text-gray-400">Voltage Chain HQ</p>
          <p className="text-gray-400">123 Tech Street, BD 1000</p>
        </div>
      </div>

      <div className="shadow border-black mx-auto rounded-2xl p-8 max-w-2xl">
        <h3 className="font-avant text-xl text-white font-semibold mb-6">
          Send us a Message
        </h3>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Message
            </label>
            <textarea
              placeholder="Enter your message"
              rows={6}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
            ></textarea>
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-avant font-semibold py-3 rounded-lg hover:shadow-lg transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
