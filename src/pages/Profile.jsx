import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101828] px-6 lg:px-8">
      <div className="w-full max-w-sm rounded-3xl border border-slate-700/60 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">

        <h2 className="text-center text-2xl font-bold tracking-tight text-white mb-6">
          Your Profile
        </h2>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold mb-3">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <h3 className="text-lg font-semibold text-white">{user?.username || "—"}</h3>
          <p className="text-sm text-slate-400">{user?.email || "—"}</p>
          <span className="mt-2 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-slate-700">
            {user?.role || "USER"}
          </span>
        </div>

        <div className="flex flex-col gap-3 mb-8 text-sm text-slate-300">
          <div className="flex justify-between items-center py-3 border-b border-slate-700">
            <span className="text-slate-400">Username</span>
            <span className="font-medium text-white">{user?.username || "—"}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-700">
            <span className="text-slate-400">Email</span>
            <span className="font-medium text-white">{user?.email || "—"}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-700">
            <span className="text-slate-400">Role</span>
            <span className="font-medium text-white">{user?.role || "—"}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-400">Status</span>
            <span className="font-medium text-emerald-400">● Active</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full rounded-md bg-indigo-500 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition"
        >
          Logout →
        </button>

      </div>
    </div>
  );
};

export default Profile;