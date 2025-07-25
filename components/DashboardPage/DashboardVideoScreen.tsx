import { useState } from 'react';

function VideoStatusBar({ progress = 0 }) {
  // progress: 0-1
  return (
    <div className="w-full flex items-center justify-between mt-8 rounded-2xl">
      {/* Prev Button */}
      <div className="flex items-center">
        <button className="bg-white border border-[#6DF4F9] rounded-lg px-6 py-2 flex flex-row-reverse items-center justify-center mr-4 font-medium text-gray-900 hover:bg-[#6DF4F9]/15 transition-colors duration-300">Prev
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          
        </button>
      </div>
      {/* Status Bar */}
      <div className="flex-1 mx-4">
        <div className="relative h-9 flex items-center">
          <div className="absolute left-0 top-0 w-full h-full rounded-lg border border-[#6DF4F9] bg-[#1C1C1C]/[0.03]" />
          <div className="absolute left-0 top-0 h-full rounded-lg bg-[#6DF4F9]" style={{ width: `${Math.max(52, 556 * progress)}px`, minWidth: 52, maxWidth: 556 }} />
          <div className="relative flex items-center justify-between h-full px-4">
            <span className="text-xs font-medium text-gray-600">Watched: </span>
            <span className="text-xs text-gray-500"> {Math.round(progress * 100)}%</span>
          </div>
        </div>
      </div>
      {/* Next Button */}
      <div className="flex items-center">
        <button className="bg-white border border-[#6DF4F9] rounded-lg px-6 py-2 flex items-center ml-4 font-medium text-gray-900 hover:bg-[#6DF4F9]/15 transition-colors duration-300">Next
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function DashboardVideoScreen({ video }: { video: { title: string; duration: string; src: string } }) {
  const [progress] = useState(0.1); // Example progress
  return (
    <section className="flex-1 flex flex-col items-center px-12 py-8 bg-white min-h-screen rounded-2xl">
      <div className="w-full max-w-3xl mx-auto">
        <iframe
          src={video.src}
          style={{ width: '100%', height: 500, border: 'none', borderRadius: 16 }}
          title={video.title}
          allowFullScreen
        />
        <div className="mt-6 text-2xl font-semibold text-gray-900">{video.title}</div>
        <VideoStatusBar progress={progress} />
      </div>
    </section>
  );
}
