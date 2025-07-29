import { useMemo } from 'react';

function VideoStatusBar({
  progress = 0,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  progress?: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <>
      {/* Desktop: normal status bar */}
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
      {/* Mobile: fixed bottom status bar */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full z-40 flex justify-center items-end pointer-events-none">
        <div className="w-full max-w-md mx-auto bg-white rounded-t-2xl shadow-lg px-4 pt-4 pb-6 flex flex-col items-center pointer-events-auto">
          {/* Progress Bar */}
          <div className="w-full mb-6">
            <div className="relative h-10 flex items-center">
              <div className="absolute left-0 top-0 w-full h-full rounded-lg border border-[#6DF4F9] bg-[#1C1C1C]/[0.03]" />
              <div className="absolute left-0 top-0 h-full rounded-lg bg-[#6DF4F9]" style={{ width: `${Math.max(52, 556 * progress)}px`, minWidth: 52, maxWidth: '100%' }} />
              <div className="relative flex items-center justify-between h-full px-4">
                <span className="text-xs font-medium text-gray-600">Watched: </span>
                <span className="text-xs text-gray-500"> {Math.round(progress * 100)}%</span>
              </div>
            </div>
          </div>
      {/* Navigation Buttons - icon and text in one row */}
      <div className="w-full flex justify-between gap-4">
        <button
          className={`w-1/2 flex flex-row items-center justify-center border border-[#6DF4F9] rounded-xl py-3 font-medium text-gray-900 transition-colors duration-300 ${!hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6DF4F9]/15'}`}
          onClick={hasPrev ? onPrev : undefined}
          disabled={!hasPrev}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="items-center"><path d="M15 18l-6-6 6-6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-base">Prev</span>
        </button>
        <button
          className={`w-1/2 flex flex-row items-center justify-center border border-[#6DF4F9] rounded-xl py-3 font-medium text-gray-900 transition-colors duration-300 ${!hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6DF4F9]/15'}`}
          onClick={hasNext ? onNext : undefined}
          disabled={!hasNext}
        >
          <span className="text-base">Next</span>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="items-center"><path d="M9 6l6 6-6 6" stroke="#02000C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
  const progress = 0.1; // Example progress
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
    <section className="w-full flex flex-col items-center px-2 sm:px-12 py-2 sm:py-8 bg-white sm:rounded-2xl" style={{ minHeight: '40vh' }}>
      <div className="w-full max-w-md sm:max-w-3xl mx-auto">
        <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#e5e5e5' }}>
          <iframe
            src={video.src}
            className="w-full h-[220px] sm:h-[500px] border-none rounded-lg"
            title={video.title}
            allowFullScreen
          />
        </div>
        <div className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold text-gray-900 text-center">{video.title}</div>
        <div className="mt-2 sm:mt-6">
          <VideoStatusBar
            progress={progress}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </div>
      </div>
    </section>
  );
}
