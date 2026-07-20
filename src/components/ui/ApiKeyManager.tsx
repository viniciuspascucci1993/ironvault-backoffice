"use client";

import { useState } from "react";
import { Key, RefreshCw, Trash2, Eye, EyeOff, Copy } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface ApiKeyManagerProps {
  initialKey: string;
}

export default function ApiKeyManager({ initialKey }: ApiKeyManagerProps) {
  const [apiKey, setApiKey] = useState(initialKey);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/api/keys/generate");
      setApiKey(res.data.apiKey);
    } catch {
      toast.error("Erro ao gerar API Key");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    setLoading(true);

    try {
      const res = await axios.delete("/api/keys/revoke");
      setApiKey(res.data.apiKey);
    } catch {
      toast.error("Erro ao revogar API Key");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API Key copiada!");
  };

  const maskedKey = apiKey ? `iv_live_${"•".repeat(20)}` : "";

  return (
    <div className="space-y-4">
      {apiKey ? (
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-700 rounded-lg px-4 py-2.5 font-mono text-sm text-slate-300 overflow-hidden">
            {showKey ? apiKey : maskedKey}
          </div>
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title={showKey ? "Ocultar" : "Mostrar"}
          >
            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={handleCopy}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Copiar"
          >
            <Copy size={18} />
          </button>
        </div>
      ) : (
        <p className="text-slate-400 text-sm">Nenhuma API Key ativa.</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} />
          {apiKey ? "Gerar Nova Key" : "Gerar API Key"}
        </button>

        {apiKey && (
          <button
            onClick={handleRevoke}
            disabled={loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            Revogar
          </button>
        )}
      </div>
    </div>
  );
}
