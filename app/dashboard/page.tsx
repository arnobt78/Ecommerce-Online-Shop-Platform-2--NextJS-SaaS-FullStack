"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardVideoListSidebar from '../../components/DashboardPage/DashboardVideoListSidebar';
import DashboardSettingSidebar from '../../components/DashboardPage/DashboardSettingSidebar';
import DashboardVideoScreen from '../../components/DashboardPage/DashboardVideoScreen';
import DashboardSettingScreen from '../../components/DashboardPage/DashboardSettingScreen';

// const initialVideoList = [
//   // {
//   //   title: 'Proxy Test: HeyGen Embed',
//   //   duration: 'Test',
//   //   src: '/api/heygen-proxy?url=https://app.heygen.com/embeds/29aabbe5b45f47bea7c4b80edaae1198',
//   // },
//   {
//     title: 'What is Nicotine',
//     duration: '9:33',
//     src: 'https://app.heygen.com/embeds/29aabbe5b45f47bea7c4b80edaae1198',
//   },
//   {
//     title: 'What is Smoking',
//     duration: '10:08',
//     src: 'https://app.heygen.com/embeds/c752c47a77ad47f9a2e48db6ce259bf2',
//   },
//   // Add more videos as needed, using the correct HeyGen embed URLs
// ];

const initialVideoList = [
  {
    title: 'What is Nicotine?',
    duration: '9:33',
    src: 'https://app.heygen.com/embeds/29aabbe5b45f47bea7c4b80edaae1198',
  },
  {
    title: 'History.',
    duration: '10:08',
    src: 'https://app.heygen.com/embeds/c752c47a77ad47f9a2e48db6ce259bf2',
  },
  {
    title: 'Effects.',
    duration: '9:28',
    src: 'https://app.heygen.com/embeds/fff30d50262f45b583ea569528a07b90',
  },
  {
    title: 'How they work?',
    duration: '9:36',
    src: 'https://app.heygen.com/embeds/a31d7f575a7943a292219159e64e678a',
  },
  {
    title: 'Smoking x vaping.',
    duration: '10:55',
    src: 'https://app.heygen.com/embeds/4b0edd4ddc46423f8573b85580beb0ff',
  },
  {
    title: 'Pros. and cons.',
    duration: '11:56',
    src: 'https://app.heygen.com/embeds/e0b1e65bec434d4ba5e9f21b0d3bd04c',
  },
  {
    title: 'Nicotine salt.',
    duration: '10:34',
    src: 'https://app.heygen.com/embeds/44cf86330949487d923dd3955c34a246',
  },
  {
    title: 'Freebase nicotine.',
    duration: '12:02',
    src: 'https://app.heygen.com/embeds/1d5d6eed05854fe3aaf8060e77cf0b1b',
  },
  {
    title: 'Strength and delivery.',
    duration: '11:31',
    src: 'https://app.heygen.com/embeds/3589199deb5b4222b1a6d703583f2d96',
  },
  {
    title: 'Natural vs synthetic.',
    duration: '11:28',
    src: 'https://app.heygen.com/embeds/ac9745473c014745b6c6e312e5bf6693',
  },
  {
    title: 'Manufacturing.',
    duration: '11:20',
    src: 'https://app.heygen.com/embeds/cb8fd7f5bb3b47bea3b3356c0d301c00',
  },
  {
    title: 'Quality control.',
    duration: '12:12',
    src: 'https://app.heygen.com/embeds/b6239f1321aa49248c5deb09e763de88',
  },
  {
    title: 'How to use responsibly.',
    duration: '11:17',
    src: 'https://app.heygen.com/embeds/ae6ca86ffe904d99b221c0262289bcd3',
  },
  {
    title: 'Dosage, strength, frequency.',
    duration: '13:02',
    src: 'https://app.heygen.com/embeds/cbdc44b33b314e629545c96b2c890c4c',
  },
  {
    title: 'Overuse risks.',
    duration: '11:27',
    src: 'https://app.heygen.com/embeds/319a448d0ca543918f1a6a127d30eefd',
  },
  {
    title: 'How it develops?',
    duration: '10:11',
    src: 'https://app.heygen.com/embeds/65121c1911c04226890e7a6d741a2cc3',
  },
  {
    title: 'Signs and Symptoms.',
    duration: '10:57',
    src: 'https://app.heygen.com/embeds/a1758c22ad59435590afba9df9fdd419',
  },
  {
    title: 'Prevention, treatment.',
    duration: '12:33',
    src: 'https://app.heygen.com/embeds/01612629f1104d2289bc05a9903a32cc',
  },
];


type TabName = 'Course' | 'Setting' | 'Logout';


export default function DashboardClientPage() {
  const [activeTab, setActiveTab] = useState<TabName>('Course');
  const [videoList] = useState(initialVideoList);
  const [selectedVideo, setSelectedVideo] = useState(initialVideoList[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  // Check authentication after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authenticated = localStorage.getItem('demo_authenticated') === 'true';
      setIsAuthenticated(authenticated);
      setIsHydrated(true);
    }
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show loading while checking authentication
  if (!isHydrated || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01DAE3] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  let mainContent;
  if (activeTab === 'Course') {
    mainContent = (
      <DashboardVideoScreen
        video={selectedVideo}
        videoList={videoList}
        setSelectedVideo={video => {
          setSelectedVideo(video);
          // Scroll to top on all screens
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
    );
  } else if (activeTab === 'Setting') {
    mainContent = <DashboardSettingScreen />;
  } else if (activeTab === 'Logout') {
    mainContent = (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">You have been logged out.</h2>
        {/* You can add actual logout logic here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Mobile layout: only visible on mobile screens */}
      <div className="block sm:hidden w-full flex flex-col items-center">
        {/* Top navbar: logo left, burger right */}
        <div className="w-full flex items-center justify-between py-4 px-4 bg-white shadow-sm">
          {/* Logo left */}
          <svg width="150" height="36" viewBox="0 0 212 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="block align-middle">
            <path fillRule="evenodd" clipRule="evenodd" d="M141.703 0L101.485 21.9095L120.794 16.1033L117.242 20.991L97.3704 26.7174L116.132 2.6217L78.3892 20.5442L95.2231 18.7249L79.7619 40L115.898 22.8406L105.333 37.3783L149.301 16.4998L122.942 24.0957L141.703 0ZM75.5439 22.6094L74.9588 24.6662C74.3356 26.8568 72.8308 27.952 70.4445 27.952C68.0219 27.952 67.1223 26.8568 67.7454 24.6662L72.5609 7.73941H63.0695L58.41 24.1185C57.4846 27.3711 57.568 29.8106 58.6601 31.4369C59.7522 33.0632 61.6361 33.8764 64.3117 33.8764C66.5173 33.8764 68.3765 33.3786 69.889 32.3829C71.4016 31.3871 72.6188 30.1591 73.5404 28.6988H73.8115L72.4094 33.6275H81.9007L85.3363 21.5511L75.5439 22.6094ZM76.4134 19.553L87.3871 14.342L89.2654 7.73941H79.7742L76.4134 19.553ZM34.5886 7.73941H44.0798L42.6777 12.6681H42.9489C43.8706 11.2077 45.0876 9.97972 46.6003 8.98403C48.1129 7.98833 49.9719 7.49048 52.1775 7.49048C54.8531 7.49048 56.737 8.30364 57.8292 9.92993C58.9213 11.5562 59.0046 13.9957 58.0794 17.2483L53.4197 33.6275H43.9285L48.7439 16.7007C49.3671 14.5101 48.4673 13.4149 46.0448 13.4149C43.6585 13.4149 42.1536 14.5101 41.5305 16.7007L36.7151 33.6275H27.2238L34.5886 7.73941ZM0 33.6275L2.45874 25.1641C2.48061 25.1641 2.56031 25.1643 2.69078 25.1648C4.71776 25.1726 18.986 25.227 19.0747 24.9152C19.1691 24.5832 19.0356 24.4173 18.6739 24.4173L9.79828 23.9692C7.3412 23.8365 5.64122 23.1395 4.69836 21.8783C3.80109 20.5838 3.70654 18.6921 4.41468 16.2028C5.19837 13.4481 6.57059 11.3571 8.53136 9.92993C10.5016 8.46959 13.0053 7.73941 16.0424 7.73941H31.8251L28.9517 16.2028C28.9298 16.2028 28.8516 16.2025 28.724 16.202H28.7199C26.7236 16.1942 12.8391 16.1401 12.7504 16.4517C12.7221 16.5513 12.7252 16.6674 12.7598 16.8003C12.8399 16.8998 12.9703 16.9496 13.1512 16.9496L22.0269 17.3976C24.4839 17.5305 26.1611 18.2439 27.0583 19.5384C28.0012 20.7997 28.1185 22.6748 27.4104 25.1641C26.6267 27.9188 25.2498 30.0264 23.2796 31.4868C21.3188 32.9139 18.8198 33.6275 15.7827 33.6275H0Z" fill="#02000C" />
            <path fillRule="evenodd" clipRule="evenodd" d="M159.347 15.0146C159.347 17.0818 158.825 18.9193 157.781 20.5271C156.75 22.1349 155.312 23.3408 153.466 24.1447C151.62 24.9486 149.449 25.3505 146.954 25.3505H143.04L141.206 34.1744H132.957L134.843 25.227L145.157 19.4361H146.649C147.833 19.4361 148.781 19.0788 149.494 18.3642C150.029 17.8277 150.367 17.1836 150.507 16.4319L152.922 15.0763L150.582 15.5776C150.58 14.6388 150.287 13.9216 149.704 13.4259C149.118 12.9155 148.278 12.6603 147.183 12.6603H145.732L144.88 16.7996L136.229 18.6536L138.743 6.72668H149.799C152.88 6.72668 155.242 7.44127 156.884 8.87044C158.526 10.2868 159.347 12.3349 159.347 15.0146ZM181.3 17.0327H181.248C180.383 16.5992 179.44 16.3824 178.42 16.3824C176.62 16.3824 175.158 16.9026 174.034 17.9431C172.927 18.9836 172.088 20.7697 171.517 23.3015L169.233 34.1744H158.178L161.785 17.1888C162.633 13.235 163.187 10.0182 163.446 7.53844H174.319C174.129 9.22053 173.904 10.9286 173.645 12.6627H173.748C174.769 10.6859 175.868 9.2292 177.044 8.29278C178.238 7.35636 179.622 6.88815 181.196 6.88815C181.854 6.88815 182.632 7.00087 183.532 7.2263L181.3 17.0327ZM209.898 27.1512C211.299 24.5674 212 21.7235 212 18.6194C212 14.8737 210.892 11.9864 208.678 9.95753C206.463 7.91128 203.332 6.88815 199.284 6.88815C196.62 6.88815 194.249 7.26966 192.173 8.03267C190.115 8.79568 188.376 9.89684 186.957 11.3361C185.539 12.7581 184.431 14.5182 183.636 16.6165C182.84 18.7148 182.442 20.8564 182.442 23.0414C182.442 26.7697 183.558 29.6657 185.789 31.7293C188.039 33.7929 191.213 34.8247 195.313 34.8247C198.67 34.8247 201.593 34.1917 204.085 32.9258C206.576 31.6426 208.514 29.7177 209.898 27.1512ZM200.244 15.9402C200.746 16.5472 200.996 17.4402 200.996 18.6194C200.996 20.9605 200.564 22.894 199.699 24.42C198.834 25.946 197.692 26.709 196.273 26.709C195.408 26.709 194.716 26.4142 194.197 25.8246C193.696 25.2177 193.445 24.3246 193.445 23.1454C193.445 21.7755 193.644 20.4489 194.042 19.1657C194.457 17.8651 195.019 16.8506 195.729 16.1223C196.438 15.3766 197.268 15.0038 198.22 15.0038C199.068 15.0038 199.742 15.3159 200.244 15.9402Z" fill="#01DAE3" />
          </svg>
          {/* Burger menu right */}
          <button
            aria-label="Open sidebar"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.25 9H29.75M4.25 17.5H29.75M4.25 26H29.75" stroke="#3AD8E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {/* Main content: ONLY video screen on mobile */}
        <div className="w-full min-h-screen flex flex-col items-center">
          {mainContent}
        </div>
        {/* Sidebar drawer for settings (phone only) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="flex-1 bg-black/30" onClick={() => setSidebarOpen(false)} />
            {/* Sidebar content */}
            <div className="w-[80vw] max-w-xs bg-white h-full shadow-xl flex flex-col overflow-y-auto">
              <div className="flex justify-end p-4">
                <button
                  aria-label="Close sidebar"
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L18 18M6 18L18 6" stroke="#3AD8E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              {/* Sidebar header with play icon and Course title */}
              <div className="px-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center bg-[#DFFFFF] rounded-md px-8 py-2">
                    {/* <span className="mr-2">
                      <svg width="20" height="20" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.849 11.0614L2.51459 0.743373C2.31225 0.62294 2.08162 0.55826 1.84616 0.555913C1.61071 0.553567 1.37883 0.613638 1.17413 0.730013C0.96943 0.846389 0.799213 1.01492 0.6808 1.21844C0.562386 1.42197 0.500004 1.65324 0.5 1.88871V22.112C0.500275 22.3453 0.561768 22.5745 0.678339 22.7767C0.79491 22.9788 0.962478 23.1469 1.16431 23.264C1.36614 23.3811 1.59517 23.4433 1.82853 23.4442C2.06189 23.4451 2.2914 23.3848 2.49416 23.2693L19.8284 13.3641C20.0307 13.2486 20.1992 13.082 20.317 12.881C20.4348 12.68 20.4979 12.4517 20.4999 12.2187C20.502 11.9857 20.443 11.7563 20.3287 11.5533C20.2145 11.3502 20.049 11.1807 19.8488 11.0615L19.849 11.0614ZM2.27717 21.3464V2.67022L18.2853 12.1989L2.27717 21.3464Z" fill="black"/>
                      </svg>
                    </span> */}
                    <span className="text-lg font-semibold text-gray-700">Courses</span>
                  </div>
                </div>
                <DashboardVideoListSidebar
                  videoList={videoList}
                  selectedVideo={selectedVideo}
                  onSelectVideo={video => {
                    setSelectedVideo(video);
                    setActiveTab('Course');
                    setSidebarOpen(false);
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                />
              </div>
              {/* Settings and logout below video list */}
              <div className="flex-1 flex flex-col justify-end">
                <DashboardSettingSidebar onTabChange={tab => {
                  setActiveTab(tab);
                  setSidebarOpen(false);
                }} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Desktop layout: only visible on desktop screens */}
      <div className="hidden sm:flex">
        {/* Sidebar */}
        <div className="flex-col items-center min-h-screen m-4" style={{ width: 260 }}>
          <DashboardVideoListSidebar
            videoList={videoList}
            selectedVideo={selectedVideo}
            onSelectVideo={video => {
              setSelectedVideo(video);
              setActiveTab('Course');
            }}
          />
          <div className="h-30 mb-4" />
          <DashboardSettingSidebar onTabChange={setActiveTab} />
        </div>
        {/* Main content */}
        <div className="flex-1 flex justify-center items-start my-4 mr-4">
          {mainContent}
        </div>
      </div>
    </div>
  );
}
