import React, { useState, useEffect } from "react";

import CustomDropdown from "./components/CustomDropdown";
import Sidebar from "./components/Sidebar";
import {
  fetchUrlsApi,
  createShortUrl,
  removeUrl,
  fetchQrCodeApi,
} from "./services/urlService";

function App() {
  // State for managing the list of shortened URLs
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [expiration, setExpiration] = useState("");
  // Store QR codes for each URL
  const [qrCodes, setQrCodes] = useState({});

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const data = await fetchUrlsApi();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const shortenUrl = async () => {
    try {
      await createShortUrl({ url, expiration });
      setUrl("");
      setExpiration("");
      fetchUrls();
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const deleteUrl = async (id) => {
    try {
      await removeUrl(id);
      fetchUrls();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const showQr = async (id) => {
    if (qrCodes[id]) {
      setQrCodes({ ...qrCodes, [id]: null }); // hide if already shown
    } else {
      try {
        const data = await fetchQrCodeApi(id);
        setQrCodes({ ...qrCodes, [id]: data.qrCode });
      } catch (error) {
        console.error("Error fetching QR:", error);
      }
    }
  };

  return (
    // Main layout with sidebar and main content
    <div className="min-h-screen grid grid-cols-[380px_1fr]">
      {/* Sidebar with logo and URL list */}
      <Sidebar
        urls={urls}
        qrCodes={qrCodes}
        onShowQr={showQr}
        onDelete={deleteUrl}
        refreshUrls={fetchUrls}
      />
      <main className="px-15 pt-[70px] pb-10 max-w-[980px] mx-auto">
        <h1 className="text-3xl font-bold text-[#111827] mb-12">
          URL Shortener
        </h1>
        <div className="grid grid-cols-[560px_240px] gap-6 items-start">
          <div>
            <input
              type="text"
              placeholder="Paste the URL to be shortened"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-12 px-4 py-3 text-lg border border-[#8a8a8a] rounded-sm placeholder-[#9b9b9b] mb-8"
            />
            <button
              onClick={shortenUrl}
              className="w-[160px] h-12 bg-[#8b1fa3] text-white font-semibold hover:brightness-95"
            >
              Shorten URL
            </button>
          </div>
          <CustomDropdown
            value={expiration}
            onChange={setExpiration}
            options={[
              { label: "1 minute", value: "1 min" },
              { label: "5 minutes", value: "5 min" },
              { label: "30 minutes", value: "30 min" },
              { label: "1 hour", value: "1 hr" },
              { label: "5 hours", value: "5 hrs" },
            ]}
            placeholder="Add expiration date"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
