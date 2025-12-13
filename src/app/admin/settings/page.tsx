'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCog, HiSave, HiCheck, HiTrash, HiPlus } from 'react-icons/hi';
import { useCMSStore } from '@/store/cms-store';

export default function SettingsPage() {
  const settings = useCMSStore((state) => state.settings);
  const updateSettings = useCMSStore((state) => state.updateSettings);
  const highlights = useCMSStore((state) => state.highlights);
  const updateHighlights = useCMSStore((state) => state.updateHighlights);
  const stats = useCMSStore((state) => state.stats);
  const updateStats = useCMSStore((state) => state.updateStats);

  const [settingsData, setSettingsData] = useState({
    siteName: '',
    siteDescription: '',
  });
  const [highlightsData, setHighlightsData] = useState<typeof highlights>([]);
  const [statsData, setStatsData] = useState<typeof stats>([]);
  const [saved, setSaved] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize data from store on first render after hydration
  if (!initialized && settings.siteName) {
    setSettingsData(settings);
    setHighlightsData(highlights);
    setStatsData(stats);
    setInitialized(true);
  }

  const handleSave = () => {
    updateSettings(settingsData);
    updateHighlights(highlightsData);
    updateStats(statsData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addHighlight = () => {
    setHighlightsData([
      ...highlightsData,
      {
        id: Math.random().toString(36).substr(2, 9),
        icon: 'FaCode',
        title: '',
        desc: '',
      },
    ]);
  };

  const updateHighlight = (id: string, field: string, value: string) => {
    setHighlightsData(
      highlightsData.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  const removeHighlight = (id: string) => {
    setHighlightsData(highlightsData.filter((h) => h.id !== id));
  };

  const addStat = () => {
    setStatsData([
      ...statsData,
      { id: Math.random().toString(36).substr(2, 9), value: '', label: '' },
    ]);
  };

  const updateStat = (id: string, field: string, value: string) => {
    setStatsData(
      statsData.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeStat = (id: string) => {
    setStatsData(statsData.filter((s) => s.id !== id));
  };

  const iconOptions = [
    { value: 'FaCode', label: 'Code' },
    { value: 'FaMicrochip', label: 'Microchip' },
    { value: 'FaLightbulb', label: 'Lightbulb' },
    { value: 'FaRocket', label: 'Rocket' },
    { value: 'FaGraduationCap', label: 'Graduation Cap' },
    { value: 'FaBriefcase', label: 'Briefcase' },
    { value: 'FaHeart', label: 'Heart' },
    { value: 'FaStar', label: 'Star' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-neutral-700 rounded-xl flex items-center justify-center">
          <HiCog className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-neutral-500">
            Konfigurasi website dan about section
          </p>
        </div>
      </div>

      {/* Site Settings */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Site Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settingsData.siteName}
              onChange={(e) =>
                setSettingsData((prev) => ({
                  ...prev,
                  siteName: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Site Description
            </label>
            <input
              type="text"
              value={settingsData.siteDescription}
              onChange={(e) =>
                setSettingsData((prev) => ({
                  ...prev,
                  siteDescription: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
        </div>
      </div>

      {/* About Highlights */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">About Highlights</h2>
          <button
            onClick={addHighlight}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 text-white rounded-lg text-sm hover:bg-neutral-700 transition-colors"
          >
            <HiPlus size={16} />
            Add
          </button>
        </div>
        <div className="space-y-4">
          {highlightsData.map((highlight, index) => (
            <div
              key={highlight.id}
              className="flex items-start gap-4 p-4 bg-black rounded-xl"
            >
              <span className="text-neutral-500 text-sm mt-3">{index + 1}</span>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={highlight.icon}
                  onChange={(e) =>
                    updateHighlight(highlight.id, 'icon', e.target.value)
                  }
                  className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={highlight.title}
                  onChange={(e) =>
                    updateHighlight(highlight.id, 'title', e.target.value)
                  }
                  placeholder="Title"
                  className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="text"
                  value={highlight.desc}
                  onChange={(e) =>
                    updateHighlight(highlight.id, 'desc', e.target.value)
                  }
                  placeholder="Description"
                  className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <button
                onClick={() => removeHighlight(highlight.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-neutral-400 hover:text-red-400"
              >
                <HiTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* About Stats */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">About Stats</h2>
          <button
            onClick={addStat}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 text-white rounded-lg text-sm hover:bg-neutral-700 transition-colors"
          >
            <HiPlus size={16} />
            Add
          </button>
        </div>
        <div className="space-y-4">
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              className="flex items-center gap-4 p-4 bg-black rounded-xl"
            >
              <span className="text-neutral-500 text-sm">{index + 1}</span>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                  placeholder="Value (e.g., 10+)"
                  className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                  placeholder="Label (e.g., Projects)"
                  className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <button
                onClick={() => removeStat(stat.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-neutral-400 hover:text-red-400"
              >
                <HiTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors"
        >
          <HiSave size={20} />
          Simpan Semua
        </motion.button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-green-400"
          >
            <HiCheck size={20} />
            Tersimpan!
          </motion.span>
        )}
      </div>
    </div>
  );
}
