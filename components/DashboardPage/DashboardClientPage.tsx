"use client";


import React, { useState } from 'react';
import DashboardVideoListSidebar from './DashboardVideoListSidebar';
import DashboardSettingSidebar from './DashboardSettingSidebar';
import DashboardVideoScreen from './DashboardVideoScreen';
import DashboardSettingScreen from './DashboardSettingScreen';

const initialVideoList = [
  {
    title: 'What is Nicotine',
    duration: '2:30',
    src: 'https://app.heygen.com/guest/videos/29aabbe5b45f47bea7c4b80edaae1198',
  },
  {
    title: 'What is Smoking',
    duration: '42:30',
    src: 'https://app.heygen.com/guest/videos/29aabbe5b45f47bea7c4b80edaae1198',
  },
  {
    title: 'What is Green World',
    duration: '1:10:30',
    src: 'https://app.heygen.com/guest/videos/29aabbe5b45f47bea7c4b80edaae1198',
  },
  {
    title: 'What is Metal Music',
    duration: '3:02:30',
    src: 'https://app.heygen.com/guest/videos/29aabbe5b45f47bea7c4b80edaae1198',
  },
  {
    title: 'What is Black Metal',
    duration: '22:30',
    src: 'https://app.heygen.com/guest/videos/29aabbe5b45f47bea7c4b80edaae1198',
  },
  {
    title: 'What is Death Metal',
    duration: '2:22:30',
    src: 'https://app.heygen.com/guest/videos/29aabbe5b45f47bea7c4b80edaae1198',
  },
  {
    title: 'What is Blackened Death Metal',
    duration: '1.02:30',
    src: 'https://app.heygen.com/guest/videos/29aabbe5b45f47bea7c4b80edaae1198',
  },
];


type TabName = 'Course' | 'Setting' | 'Logout';


export default function DashboardClientPage() {
  const [activeTab, setActiveTab] = useState<TabName>('Course');
  const [videoList] = useState(initialVideoList);
  const [selectedVideo, setSelectedVideo] = useState(initialVideoList[0]);

  let mainContent;
  if (activeTab === 'Course') {
    mainContent = <DashboardVideoScreen video={selectedVideo} />;
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
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Sidebar column: video list card, then settings card, with spacing */}
      <div className="flex flex-col items-center min-h-screen m-4" style={{ width: 260 }}>
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
      <div className="flex-1 flex justify-center items-start my-4 mr-4">
        {mainContent}
      </div>
    </div>
  );
}
