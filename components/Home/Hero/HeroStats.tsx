"use client";

import CountUp from "react-countup";

const stats = [
  { num: 47, text: "Orders today" },
  { num: 7000, text: "Orders", suffix: "+" },
  { num: 4000, text: "Customers", suffix: "+" },
];


const HeroStats = () => {
  return (
    <div className="w-full mt-6 border-t border-gray-200 bg-transparent">
      <div className="flex flex-row items-stretch justify-center w-full divide-x divide-gray-200 bg-transparent">
        {stats.map((item, idx) => (
          <div
            key={item.text}
            className={`flex-1 flex flex-col items-center justify-center py-8 bg-transparent`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                <CountUp
                  end={item.num}
                  duration={2}
                  delay={0.5}
                  suffix={item.suffix || ""}
                />
              </div>
              <div className="text-base text-gray-600 text-center mt-1">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroStats;
