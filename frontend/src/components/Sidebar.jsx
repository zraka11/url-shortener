import React from "react";
import logo from "../assets/logo.svg";
import qrIcon from "../assets/qr-icon.png";
import { API_BASE, SHORT_BASE } from "../config/env";

function Sidebar({ urls, qrCodes, onShowQr, onDelete, refreshUrls }) {
  return (
    <aside className="bg-gray-100 w-[380px] pt-[74px] pb-5 px-5 flex flex-col justify-start">
      <img
        src={logo}
        alt="AnchorzUp logo"
        style={{ width: "180px", height: "31px" }}
        className="mx-auto mb-12"
      />
      <h2 className="text-base font-bold text-[#333333] mb-5 ml-[80px]">
        My shortened URLs
      </h2>
      <div className="flex flex-col gap-3 items-center ml-[80px]">
        {urls.map((u) => (
          <div key={u._id} className="flex flex-col">
            <div className="flex items-center gap-7">
              <a
                href={`${API_BASE}/${u.shortId}`}
                className="text-sm text-[#1a73e8] underline truncate max-w-[170px]"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setTimeout(() => refreshUrls(), 1000)}
              >
                {`${SHORT_BASE}/${u.shortId}`}
              </a>
              <button
                onClick={() => onShowQr(u._id)}
                aria-label="Show QR code"
                className="cursor-pointer"
              >
                <img src={qrIcon} alt="QR" className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(u._id)}
                aria-label="Delete link"
                className="text-sm cursor-pointer"
              >
                🗑️
              </button>
            </div>
            <p className="text-sm text-[#9bb7f4] mt-1.5">
              This link has been clicked {u.clickCount} times.
            </p>
            {qrCodes[u._id] && (
              <div className="mt-2 p-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
                <h3 className="text-sm font-semibold mb-2 text-center">
                  QR Code
                </h3>
                <img
                  src={qrCodes[u._id]}
                  alt="QR Code"
                  className="w-32 h-32 mx-auto block"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
