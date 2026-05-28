import React from "react";

export const InteractiveMap = () => {
  const address = "인천광역시 미추홀구 학익2동 290-1";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="relative w-full h-full flex flex-col group/map">
      {/* 1. Fully-loaded, High-Definition Colored Google Maps. No grayscale filter. */}
      {/* Shows rich local Korean language details (Incheon Court, schools, subways, apartment complexes, roads) */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map (학익2동 290-1)"
        className="w-full h-full min-h-[400px] md:min-h-full bg-slate-50 relative z-10"
      ></iframe>

      {/* 2. Top-left elegant static address card overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-[calc(100%-2rem)]">
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xs border border-gray-200/80 shadow-lg shadow-gray-900/10 transition-all duration-300">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white ring-2 ring-amber-500/20 shadow-xs shrink-0"></span>
            <span className="font-extrabold text-[12px] text-gray-950 font-sans tracking-tight">한화포레나 인천학익 현장</span>
          </div>
          <p className="text-[11px] text-gray-500 font-bold font-sans leading-tight">
            인천광역시 미추홀구 학익2동 290-1
          </p>
        </div>
      </div>

      {/* 3. Bottom-right quick redirect buttons right inside the map container */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <a
          href="https://map.naver.com/v5/search/인천광역시%20미추홀구%20학익2동%20290-1"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[11px] rounded-xs shadow-md transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer border border-emerald-600 font-sans select-none"
        >
          <span>네이버 지도 열기</span>
        </a>
        <a
          href="https://map.kakao.com/?q=인천광역시%20미추홀구%20학익2동%20290-1"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2.5 bg-amber-400 hover:bg-amber-500 text-yellow-950 font-extrabold text-[11px] rounded-xs shadow-md transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer border border-amber-500 font-sans select-none"
        >
          <span>카카오맵 열기</span>
        </a>
      </div>

      {/* Bottom map border accent glow */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-500 z-20 opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};
