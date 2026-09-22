import React from "react";

interface AccountInfoCardProps {
  name: string;
  email: string;
  altEmail: string;
  phone: string;
}

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({
  name,
  email,
  altEmail,
  phone,
}) => {
  return (
    <div className="shadow border-black rounded-2xl p-6 flex flex-col">
      <h3 className="font-avant text-cyan-400 text-sm font-semibold mb-4 uppercase">
        Account Info
      </h3>
      <div className="flex items-start gap-4 mb-4">
        <img src="https://avatars.githubusercontent.com/u/206544456?v=4" className="w-10 rounded-full" alt="" />
        <div>
          <h4 className="text-white font-avant font-semibold">{name}</h4>
          <p className="text-gray-400 text-sm">Dhaka, 1204 Bangladesh</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-gray-400">
          Email: <span className="text-white">{email}</span>
        </p>
        <p className="text-gray-400">
          Alt Email: <span className="text-white">{altEmail}</span>
        </p>
        <p className="text-gray-400">
          Phone Number: <span className="text-white">{phone}</span>
        </p>
      </div>
      <button className="mt-6 text-cyan-400 font-avant font-semibold text-sm hover:text-cyan-300 transition-colors">
        EDIT ACCOUNT
      </button>
    </div>
  );
};

const BillingAddressCard: React.FC = () => {
  return (
    <div className="shadow border-black rounded-2xl p-6 flex flex-col">
      <h3 className="font-avant text-cyan-400 text-sm font-semibold mb-4 uppercase">
        Billing Address
      </h3>
      <div className="space-y-3 text-sm mb-6">
        <p className="text-white font-avant font-semibold">aarushi patidar</p>
        <p className="text-gray-300">
          East Tejturi Bazar, Word No. 01, Rd Road No. 1564, Hosaina 1234C, I
          Irl No. 50, Dhaka 1000, Bangladesh
        </p>
        <p className="text-gray-300">
          Phone Number: <span className="text-white">+91-9788143143</span>
        </p>
        <p className="text-gray-300">
          Email: <span className="text-white">Aarushi.gilbert@gmail.com</span>
        </p>
      </div>
      <button className="text-cyan-400 font-avant font-semibold text-sm hover:text-cyan-300 transition-colors">
        EDIT ADDRESS
      </button>
    </div>
  );
};

const WalletAddressCard: React.FC<{ wallet?: string }> = ({ wallet = "0xAbC123...def" }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wallet);
      // eslint-disable-next-line no-undef
      (window as any).toast?.success?.("Wallet address copied");
    } catch (e) {
      // fallback
    }
  };

  return (
    <div className="shadow border-black rounded-2xl p-6 flex flex-col">
      <h3 className="font-avant text-cyan-400 text-sm font-semibold mb-4 uppercase">
        Wallet Address
      </h3>
      <div className="space-y-3 text-sm mb-6">
        <p className="text-white font-avant font-semibold">Primary Wallet</p>
        <p className="text-gray-400 break-all">{wallet}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="text-cyan-400 font-avant font-semibold text-sm hover:text-cyan-300 transition-colors"
        >
          COPY ADDRESS
        </button>
        <button className="text-gray-400 font-avant font-semibold text-sm hover:text-white transition-colors">
          MANAGE WALLETS
        </button>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ value: string; label: string; icon: string }> = ({
  value,
  label,
  icon,
}) => {
  return (
    <div className="shadow border-black rounded-2xl p-6 flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${icon}`}
      >
        {icon === "text-cyan-400" ? "🔋" : "✅"}
      </div>
      <div>
        <p className="text-white font-avant font-bold text-3xl">{value}</p>
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
    </div>
  );
};

interface DashboardOverviewProps {
  userName?: string;
  email?: string;
  altEmail?: string;
  phone?: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userName = "Aarushi",
  email = "Aarushi.gilbert@gmail.com",
  altEmail = "Aarushi0244@gmail.com",
  phone = "+91-9788143143",
}) => {
  return (
    <div className="w-full">
      <div className="mb-8 shadow w-[50%] pl-10 py-4 rounded-2xl">
        <p className="font-avant text-4xl italic scale-y-110 text-white font-semibold mb-2">dashboard</p>
        {/* <h1 className="font-avant text-4xl text-white font-semibold mb-2">
          Hello, {userName.split(" ")[0]}
        </h1>
        <p className="text-gray-400">Welcome back to your dashboard.</p> */}
      </div>

        <h1 className="font-avant text-4xl text-white font-semibold mb-2">
            Hello, {userName.split(" ")[0]} !
        </h1>
        <p className="text-gray-400 mb-8">Welcome back to your dashboard.</p>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <AccountInfoCard
          name={userName}
          email={email}
          altEmail={altEmail}
          phone={phone}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BillingAddressCard />
        <WalletAddressCard wallet={"0xAbC1234567890abcdef1234567890AbCdEfGHiJ"} />
      </div>
    </div>
  );
};

export default DashboardOverview;
