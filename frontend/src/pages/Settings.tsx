import React, { useState, useEffect } from "react";
import { User, Shield, Save, Loader2, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile, deleteUserAccount } from "../api/user";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const updated = await updateUserProfile({ name, bio });
      updateUser(updated);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    )
      return;

    setDeleteLoading(true);
    try {
      await deleteUserAccount();
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete account.");
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full">
      { }
      <header className="mb-8 mt-12 lg:mt-0"> { }
        <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-2">
          Manage your account preferences and workspace settings.
        </p>
      </header>

      <div className="max-w-4xl">
        { }
        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
          <button className="pb-4 border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium whitespace-nowrap">
            Profile
          </button>
        </div>

        { }
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {name
                ? name.charAt(0).toUpperCase()
                : email
                  ? email.charAt(0).toUpperCase()
                  : "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Profile Picture
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Upload not implemented yet (using Gravatar/Initials)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-gray-400 w-5 h-5">
                  @
                </div>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Tell us a little about yourself..."
            ></textarea>
          </div>

          <div className="mt-8 flex items-center justify-end gap-4">
            {successMsg && (
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                {successMsg}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-black px-6 py-2.5 rounded-lg font-semibold transition shadow-lg shadow-indigo-500/30 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          </div>
        </section>

        <section className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h3 className="text-lg font-bold text-red-600 dark:text-red-500 mb-2 flex items-center gap-2">
            <Shield size={20} />
            Danger Zone
          </h3>
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-medium text-red-900 dark:text-red-400">Delete Account</div>
              <div className="text-sm text-red-700 dark:text-red-300/80">
                Once you delete your account, there is no going back. Please
                be certain.
              </div>
            </div>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              {deleteLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
