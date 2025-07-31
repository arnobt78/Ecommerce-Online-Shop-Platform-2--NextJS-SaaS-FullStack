const menu = [
  {
    name: 'Course',
    icon: (
      <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.849 11.0614L2.51459 0.743373C2.31225 0.62294 2.08162 0.55826 1.84616 0.555913C1.61071 0.553567 1.37883 0.613638 1.17413 0.730013C0.96943 0.846389 0.799213 1.01492 0.6808 1.21844C0.562386 1.42197 0.500004 1.65324 0.5 1.88871V22.112C0.500275 22.3453 0.561768 22.5745 0.678339 22.7767C0.79491 22.9788 0.962478 23.1469 1.16431 23.264C1.36614 23.3811 1.59517 23.4433 1.82853 23.4442C2.06189 23.4451 2.2914 23.3848 2.49416 23.2693L19.8284 13.3641C20.0307 13.2486 20.1992 13.082 20.317 12.881C20.4348 12.68 20.4979 12.4517 20.4999 12.2187C20.502 11.9857 20.443 11.7563 20.3287 11.5533C20.2145 11.3502 20.049 11.1807 19.8488 11.0615L19.849 11.0614ZM2.27717 21.3464V2.67022L18.2853 12.1989L2.27717 21.3464Z" fill="black"/>
      </svg>
    ),
  },
  {
    name: 'Setting',
    icon: (
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5003 7.12085C9.73308 7.12085 8.98307 7.34836 8.34514 7.77462C7.7072 8.20087 7.20999 8.80672 6.91638 9.51556C6.62277 10.2244 6.54595 11.0044 6.69563 11.7569C6.84531 12.5094 7.21477 13.2006 7.75729 13.7431C8.29981 14.2856 8.99102 14.6551 9.74352 14.8048C10.496 14.9544 11.276 14.8776 11.9848 14.584C12.6937 14.2904 13.2995 13.7932 13.7258 13.1552C14.152 12.5173 14.3795 11.7673 14.3795 11.0001C14.3784 9.9716 13.9693 8.98558 13.2421 8.25834C12.5148 7.53109 11.5288 7.12202 10.5003 7.12085ZM10.5003 13.4687C10.0121 13.4687 9.5348 13.3239 9.12884 13.0526C8.72288 12.7814 8.40647 12.3958 8.21963 11.9448C8.03279 11.4937 7.9839 10.9973 8.07915 10.5185C8.17441 10.0396 8.40952 9.59975 8.75476 9.25451C9.1 8.90927 9.53986 8.67416 10.0187 8.57891C10.4976 8.48366 10.9939 8.53254 11.445 8.71939C11.8961 8.90623 12.2816 9.22263 12.5529 9.62859C12.8241 10.0346 12.9689 10.5118 12.9689 11.0001C12.9682 11.6546 12.7079 12.282 12.2451 12.7448C11.7823 13.2076 11.1548 13.4679 10.5003 13.4687Z" fill="black"/>
        <path d="M20.1781 13.9235L18.7776 12.7706C19.0259 11.6032 19.0259 10.3967 18.7776 9.22939L20.1781 8.07651C20.3396 7.94416 20.4487 7.75864 20.4859 7.55317C20.5231 7.34769 20.486 7.13568 20.3811 6.9551L18.9435 4.46522C18.8396 4.28405 18.6745 4.14582 18.4779 4.0753C18.2813 4.00478 18.0661 4.00658 17.8707 4.08038L16.1708 4.71723C15.2853 3.91718 14.2407 3.31339 13.1054 2.94549L12.8071 1.15703C12.7733 0.950922 12.6673 0.763572 12.5079 0.628566C12.3486 0.493559 12.1463 0.419723 11.9375 0.420291H9.06234C8.85349 0.41973 8.65126 0.493563 8.4919 0.628559C8.33255 0.763555 8.22647 0.95089 8.19269 1.15699L7.8946 2.94549C6.75932 3.31338 5.71465 3.91717 4.82914 4.71723L3.12911 4.08029C2.93374 4.00654 2.71849 4.00477 2.52193 4.0753C2.32537 4.14582 2.16034 4.28404 2.05642 4.46517L0.618861 6.95524C0.514017 7.13582 0.476888 7.34784 0.514124 7.55331C0.55136 7.75878 0.66053 7.94428 0.822079 8.0766L2.22243 9.22939C1.97416 10.3967 1.97416 11.6032 2.22243 12.7706L0.821947 13.9235C0.660423 14.0558 0.551284 14.2413 0.514072 14.4468C0.476861 14.6523 0.514008 14.8643 0.618861 15.0449L2.05646 17.5348C2.1604 17.7159 2.32545 17.8541 2.52204 17.9247C2.71863 17.9952 2.9339 17.9934 3.12929 17.9196L4.82918 17.2827C5.71469 18.0828 6.75936 18.6866 7.89465 19.0545L8.19273 20.8429C8.2265 21.049 8.33257 21.2364 8.49192 21.3714C8.65127 21.5064 8.85349 21.5802 9.06234 21.5797H11.9375C12.1463 21.5802 12.3485 21.5064 12.5079 21.3714C12.6673 21.2364 12.7733 21.0491 12.8071 20.843L13.1052 19.0545C14.2405 18.6866 15.2852 18.0828 16.1707 17.2827L17.8707 17.9197C18.0661 17.9934 18.2813 17.9952 18.4779 17.9247C18.6744 17.8541 18.8394 17.7159 18.9434 17.5348L20.3808 15.0447C20.4857 14.8642 20.5229 14.6522 20.4858 14.4468C20.4486 14.2413 20.3395 14.0558 20.1781 13.9235ZM17.9459 16.4414L15.8252 15.6469L15.504 15.9702C14.6205 16.8608 13.5153 17.4995 12.3026 17.8204L11.8618 17.9366L11.4895 20.1691H9.51065L9.13851 17.9366L8.69769 17.8204C7.48494 17.4995 6.37979 16.8608 5.49623 15.9702L5.17509 15.6469L3.054 16.4414L2.06475 14.7277L3.81168 13.2895L3.69266 12.8499C3.36534 11.6383 3.36534 10.3616 3.69266 9.15008L3.81168 8.7105L2.06475 7.27236L3.05422 5.55854L5.17496 6.35308L5.4961 6.02978C6.37966 5.13921 7.48481 4.5005 8.69756 4.17952L9.13838 4.06332L9.51048 1.83092H11.4895L11.8616 4.06332L12.3025 4.17952C13.5152 4.5005 14.6204 5.13921 15.5039 6.02978L15.8251 6.35308L17.9458 5.55854L18.9353 7.27232L17.1884 8.7105L17.3074 9.15008C17.6347 10.3616 17.6347 11.6383 17.3074 12.8499L17.1884 13.2895L18.9353 14.7276L17.9459 16.4414Z" fill="black"/>
      </svg>
    ),
  },
  {
    name: 'Logout',
    icon: (
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.0518 10.668H14.4908V10.668V9.33469V9.33465H3.0518L6.17835 6.20744V6.2074L5.23571 5.26465L0.5 10.0013L0.500042 10.0014H0.5L5.23571 14.7381L6.17835 13.7953V13.7952L3.0518 10.668Z" fill="black"/>
        <path d="M6.50293 0V1.33333H19.1669V18.6667H6.50293V20H20.5V0H6.50293Z" fill="black"/>
      </svg>
    ),
  },
];


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Tab menu for dashboard. Notifies parent of tab change via onTabChange.
 * Usage: <DashboardSettingSidebar onTabChange={tab => setTab(tab)} />
 */

type TabName = 'Course' | 'Setting' | 'Logout';
interface DashboardSettingSidebarProps {
  onTabChange?: (tab: TabName) => void;
}

export default function DashboardSettingSidebar({ onTabChange }: DashboardSettingSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabName>('Course');
  const router = useRouter();

  const handleTabClick = (tab: TabName) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
    // Scroll to top on all screens
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Logout logic
    if (tab === 'Logout') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('demo_authenticated');
        localStorage.removeItem('demo_email');
        localStorage.removeItem('demo_otp');
        // Optionally clear other demo keys if needed
        router.push('/login');
      }
    }
  };

  return (
    <aside className="w-full bg-white rounded-2xl shadow-sm flex flex-col items-center py-4 px-4">
      <div className="flex flex-col gap-4 w-full items-center ">
        <button
          className={`w-full flex items-center gap-2 py-3 px-4 rounded-xl font-semibold text-base mb-2 transition-colors duration-300 ${activeTab === 'Course' ? 'bg-[#6DF4F9]/20 text-gray-900' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => handleTabClick('Course')}
        >
          <span className="mr-2">{menu[0].icon}</span>
          {menu[0].name}
        </button>
        <button
          className={`w-full flex items-center gap-2 py-3 px-4 rounded-xl font-semibold text-base mb-2 transition-colors duration-300 ${activeTab === 'Setting' ? 'bg-[#6DF4F9]/20 text-gray-900' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => handleTabClick('Setting')}
        >
          <span className="mr-2">{menu[1].icon}</span>
          {menu[1].name}
        </button>
        <button
          className={`w-full flex items-center gap-2 py-3 px-4 rounded-xl font-semibold text-base transition-colors duration-300 ${activeTab === 'Logout' ? 'bg-[#6DF4F9]/20 text-gray-900' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => handleTabClick('Logout')}
        >
          <span className="mr-2">{menu[2].icon}</span>
          {menu[2].name}
        </button>
      </div>
    </aside>
  );
}
