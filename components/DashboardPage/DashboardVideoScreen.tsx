import { useMemo, useRef, useState, useEffect } from 'react';
import IframeComponent from './IframeComponent';

function VideoStatusBar({
  progress = 0,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  videoTitle,
}: {
  progress?: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  videoTitle: string;
}) {
  return (
    <>
      {/* Desktop: navigation only, no status bar */}
      <div className="hidden sm:flex w-full items-center justify-between mt-8 rounded-2xl">
        {/* Prev Button */}
        <div className="flex items-center">
          <button
            className={`bg-white border border-[#6DF4F9] rounded-lg px-6 py-2 flex flex-row-reverse items-center justify-center mr-4 font-medium text-gray-900 transition-colors duration-300 ${!hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6DF4F9]/15'}`}
            onClick={hasPrev ? onPrev : undefined}
            disabled={!hasPrev}
          >
            Prev
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        {/* Video Title */}
        <div className="flex-1 mx-4 text-center text-2xl font-semibold text-gray-900">
          {videoTitle}
        </div>
        {/* Next Button */}
        <div className="flex items-center">
          <button
            className={`bg-white border border-[#6DF4F9] rounded-lg px-6 py-2 flex items-center ml-4 font-medium text-gray-900 transition-colors duration-300 ${!hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6DF4F9]/15'}`}
            onClick={hasNext ? onNext : undefined}
            disabled={!hasNext}
          >
            Next
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile: fixed bottom bar with navigation and title */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full z-40 flex justify-center items-end pointer-events-none">
        <div className="w-full max-w-md mx-auto bg-white rounded-t-2xl shadow-lg px-2 pt-2 pb-4 flex flex-col items-center pointer-events-auto">
          <div className="w-full flex flex-row items-center justify-between gap-2 mb-2">
            {/* Prev Button */}
            <button
              className={`flex items-center justify-center border border-[#6DF4F9] rounded-xl py-2 px-3 font-medium text-gray-900 transition-colors duration-300 text-sm ${!hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6DF4F9]/15'}`}
              onClick={hasPrev ? onPrev : undefined}
              disabled={!hasPrev}
              style={{ minWidth: 60 }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="items-center"><path d="M15 18l-6-6 6-6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="ml-1">Prev</span>
            </button>
            {/* Video Title */}
            <div className="flex-1 mx-2 text-center text-base font-semibold text-gray-900 truncate">
              {videoTitle}
            </div>
            {/* Next Button */}
            <button
              className={`flex items-center justify-center border border-[#6DF4F9] rounded-xl py-2 px-3 font-medium text-gray-900 transition-colors duration-300 text-sm ${!hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6DF4F9]/15'}`}
              onClick={hasNext ? onNext : undefined}
              disabled={!hasNext}
              style={{ minWidth: 60 }}
            >
              <span className="mr-1">Next</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="items-center"><path d="M9 6l6 6-6 6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashboardVideoScreen({
  video,
  videoList,
  setSelectedVideo,
}: {
  video: { title: string; duration: string; src: string };
  videoList: { title: string; duration: string; src: string }[];
  setSelectedVideo: (video: { title: string; duration: string; src: string }) => void;
}) {
  // --- Timer-based progress state ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse duration string (e.g., '9:33') to seconds
  const totalSeconds = useMemo(() => {
    if (!video.duration) return 1;
    const parts = video.duration.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return Number(video.duration) || 1;
  }, [video.duration]);

  // Start/stop timer on play state
  useEffect(() => {
    if (isPlaying && watchedSeconds < totalSeconds) {
      timerRef.current = setInterval(() => {
        setWatchedSeconds((prev) => {
          if (prev + 1 >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (!isPlaying && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, totalSeconds, watchedSeconds]);

  // Reset timer when video changes
  useEffect(() => {
    setIsPlaying(false);
    setWatchedSeconds(0);
  }, [video.src]);

  const progress = Math.min(watchedSeconds / totalSeconds, 1);
  const currentIdx = useMemo(() => videoList.findIndex(v => v.title === video.title), [videoList, video.title]);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < videoList.length - 1;
  const handlePrev = () => {
    if (hasPrev) {
      setSelectedVideo(videoList[currentIdx - 1]);
    }
  };
  const handleNext = () => {
    if (hasNext) {
      setSelectedVideo(videoList[currentIdx + 1]);
    }
  };
  return (
    <section className="w-full flex flex-col items-center px-1 sm:px-12 py-1 sm:py-8 bg-white sm:rounded-2xl">
      {/* --- STATIC TEST IFRAME FOR HEYGEN SHARE URL --- */}
      <div className="w-full max-w-md sm:max-w-3xl mx-auto mb-8 relative">
        <div className="w-full overflow-hidden bg-transparent">
          <iframe
            width="100%"
            height="100%"
            src={video.src}
            title={video.title}
            frameBorder="0"
            allow="encrypted-media; fullscreen;"
            allowFullScreen
            style={{ display: 'block', width: '100%', aspectRatio: '16/9', borderRadius: 12, background: '#000' }}
          />
        </div>
      </div>
      {/* --- END STATIC TEST IFRAME --- */}
      {/* ...existing code... */}

      <div className="w-full max-w-md sm:max-w-3xl mx-auto">
        {/* <div className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold text-gray-900 text-center">{video.title}</div> */}
        <div className="mt-0 sm:mt-0">
          <VideoStatusBar
            progress={progress}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
            videoTitle={video.title}
          />
        </div>
      </div>
    </section>
  );
  // Helper to format seconds as mm:ss
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
