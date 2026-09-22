"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

/* ============================= */
/* 1️⃣ Battery Details Component  */
/* ============================= */

interface BatteryPayload {
  battery_code: string;
  brand: string;
  initial_capacity?: number;
  current_capacity?: number;
  manufacture_year?: number;
  charging_cycles?: number;
}

const BatteryDetailsForm: React.FC<{
  onSuccess: (batteryId: string) => void;
}> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    battery_code: "",
    brand: "",
    initial_capacity: "",
    current_capacity: "",
    manufacture_year: "",
    charging_cycles: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: BatteryPayload = {
      battery_code: form.battery_code,
      brand: form.brand,
      initial_capacity: form.initial_capacity
        ? Number(form.initial_capacity)
        : undefined,
      current_capacity: form.current_capacity
        ? Number(form.current_capacity)
        : undefined,
      manufacture_year: form.manufacture_year
        ? Number(form.manufacture_year)
        : undefined,
      charging_cycles: form.charging_cycles
        ? Number(form.charging_cycles)
        : undefined,
    };

    try {
      const res = await fetch("http://localhost:3000/api/battery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status !== 201) {
        toast.error("Invalid payload");
        return;
      }

      const data = await res.json();
      toast.success("Battery record created");

      onSuccess(data.data.id); // assuming backend returns id
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl text-white font-semibold">
        Step 1: Battery Details
      </h2>

      <input name="battery_code" required placeholder="Battery Code"
        onChange={handleChange} value={form.battery_code}
        className="input bg-zinc-500 rounded-lg placeholder-zinc-400  text-black m-3 p-3" />

      <input name="brand" required placeholder="Brand"
        onChange={handleChange} value={form.brand}
        className="input bg-zinc-500 rounded-lg placeholder-zinc-400  text-black m-3 p-3" />

      <input name="initial_capacity" type="number"
        placeholder="Initial Capacity"
        onChange={handleChange} value={form.initial_capacity}
        className="input bg-zinc-500 rounded-lg placeholder-zinc-400  text-black m-3 p-3" />

      <input name="current_capacity" type="number"
        placeholder="Current Capacity"
        onChange={handleChange} value={form.current_capacity}
        className="input bg-zinc-500 rounded-lg placeholder-zinc-400  text-black m-3 p-3" />

      <input name="manufacture_year" type="number"
        placeholder="Manufacture Year"
        onChange={handleChange} value={form.manufacture_year}
        className="input bg-zinc-500 rounded-lg placeholder-zinc-400  text-black m-3 p-3" />

      <input name="charging_cycles" type="number"
        placeholder="Charging Cycles"
        onChange={handleChange} value={form.charging_cycles}
        className="input bg-zinc-500 rounded-lg placeholder-zinc-400  text-black m-3 p-3" />

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Processing..." : "Continue"}
      </button>
    </form>
  );
};

/* =============================== */
/* 2️⃣ Questionnaire Component      */
/* =============================== */

interface QuestionnairePayload {
  battery_id: string;
  brand_model: string;
  initial_capacity: number;
  current_capacity: number;
  years_owned: number;
  primary_application: string;
  avg_daily_usage: string;
  charging_frequency_per_week: number;
  typical_charge_level: string;
  avg_temperature_c?: number;
}

const QuestionnaireForm: React.FC<{
  batteryId: string;
  onComplete: () => void;
}> = ({ batteryId, onComplete }) => {
  const [form, setForm] = useState<any>({
    brand_model: "",
    initial_capacity: "",
    current_capacity: "",
    years_owned: "",
    primary_application: "",
    avg_daily_usage: "",
    charging_frequency_per_week: "",
    typical_charge_level: "",
    avg_temperature_c: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: QuestionnairePayload = {
      battery_id: batteryId,
      brand_model: form.brand_model,
      initial_capacity: Number(form.initial_capacity),
      current_capacity: Number(form.current_capacity),
      years_owned: Number(form.years_owned),
      primary_application: form.primary_application,
      avg_daily_usage: form.avg_daily_usage,
      charging_frequency_per_week: Number(form.charging_frequency_per_week),
      typical_charge_level: form.typical_charge_level,
      avg_temperature_c: form.avg_temperature_c
        ? Number(form.avg_temperature_c)
        : undefined,
    };

    try {
      const res = await fetch("http://localhost:3000/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error("Invalid questionnaire data");
        return;
      }

      toast.success("Battery successfully listed");
      onComplete();
    } catch {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <h2 className="text-xl text-white font-semibold">
        Step 2: Battery Questionnaire
      </h2>

      <input name="brand_model" required placeholder="Brand Model"
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg" />

      <input name="initial_capacity" type="number" required
        placeholder="Initial Capacity"
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg" />

      <input name="current_capacity" type="number" required
        placeholder="Current Capacity"
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg" />

      <input name="years_owned" type="number" required
        placeholder="Years Owned"
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg" />

      <select name="primary_application" required
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg">
        <option value="">Select Application</option>
        <option value="E-bike">E-bike</option>
        <option value="E-car">E-car</option>
      </select>

      <select name="avg_daily_usage" required
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg">
        <option value="">Daily Usage</option>
        <option value="Light">Light</option>
        <option value="Medium">Medium</option>
        <option value="Heavy">Heavy</option>
      </select>

      <input name="charging_frequency_per_week" type="number" required
        placeholder="Charging Frequency / Week"
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg" />

      <select name="typical_charge_level" required
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg">
        <option value="">Typical Charge Level</option>
        <option value="20-80">20-80</option>
        <option value="0-100">0-100</option>
        <option value="Always Full">Always Full</option>
      </select>

      <input name="avg_temperature_c" type="number"
        placeholder="Avg Temperature (optional)"
        onChange={handleChange} className="input m-3 p-3 placeholder-zinc-500 text-black bg-zinc-300 rounded-lg" />

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Submitting..." : "List Battery"}
      </button>
    </form>
  );
};

/* =============================== */
/* 3️⃣ Orchestrator Page Component  */
/* =============================== */

const ListBatteryPage: React.FC = () => {
  const [batteryId, setBatteryId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900/60 rounded-2xl text-white">
      {!batteryId && (
        <BatteryDetailsForm onSuccess={(id) => setBatteryId(id)} />
      )}

      {batteryId && !completed && (
        <QuestionnaireForm
          batteryId={batteryId}
          onComplete={() => setCompleted(true)}
        />
      )}

      {completed && (
        <div className="mt-8 text-green-400 text-lg font-semibold">
          Battery listing completed successfully.
        </div>
      )}
    </div>
  );
};

export default ListBatteryPage;
