import React from "react";

export default function AnimationsAndStyles() {
  return (
    <style jsx>{`
      @keyframes slide-in {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slide-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
      .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      .scrollbar-thin { scrollbar-width: thin; }
      .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 6px; }
      .scrollbar-track-gray-100::-webkit-scrollbar-track { background-color: #f3f4f6; }
      ::-webkit-scrollbar { width: 6px; }
      @keyframes heroLineMove1 {
        0% { transform: translateY(0) rotate(45deg); opacity: 0.6; }
        50% { transform: translateY(-20px) rotate(60deg); opacity: 1; }
        100% { transform: translateY(0) rotate(45deg); opacity: 0.6; }
      }
      @keyframes heroLineMove2 {
        0% { transform: translateX(0) rotate(12deg); opacity: 0.4; }
        50% { transform: translateX(30px) rotate(30deg); opacity: 0.7; }
        100% { transform: translateX(0) rotate(12deg); opacity: 0.4; }
      }
      @keyframes heroLineMove3 {
        0% { transform: translateY(0) rotate(-12deg); opacity: 0.5; }
        50% { transform: translateY(30px) rotate(-24deg); opacity: 0.8; }
        100% { transform: translateY(0) rotate(-12deg); opacity: 0.5; }
      }
      @keyframes heroLineMove4 {
        0% { transform: translateX(0) rotate(45deg); opacity: 0.3; }
        50% { transform: translateX(-20px) rotate(60deg); opacity: 0.6; }
        100% { transform: translateX(0) rotate(45deg); opacity: 0.3; }
      }
      @keyframes heroLineMove5 {
        0% { transform: translateY(0) rotate(45deg); opacity: 0.6; }
        50% { transform: translateY(-15px) rotate(60deg); opacity: 1; }
        100% { transform: translateY(0) rotate(45deg); opacity: 0.6; }
      }
      @keyframes heroLineMove6 {
        0% { transform: translateY(0) rotate(-12deg); opacity: 0.4; }
        50% { transform: translateY(20px) rotate(-24deg); opacity: 0.7; }
        100% { transform: translateY(0) rotate(-12deg); opacity: 0.4; }
      }
      @keyframes heroLineMove7 {
        0% { transform: translateX(0) rotate(12deg); opacity: 0.5; }
        50% { transform: translateX(-15px) rotate(24deg); opacity: 0.8; }
        100% { transform: translateX(0) rotate(12deg); opacity: 0.5; }
      }
      @keyframes heroLineMove8 {
        0% { transform: translateY(0) rotate(45deg); opacity: 0.3; }
        50% { transform: translateY(-10px) rotate(60deg); opacity: 0.6; }
        100% { transform: translateY(0) rotate(45deg); opacity: 0.3; }
      }
      @keyframes heroLineMove9 {
        0% { transform: translateY(0) rotate(-12deg); opacity: 0.25; }
        50% { transform: translateY(10px) rotate(-24deg); opacity: 0.5; }
        100% { transform: translateY(0) rotate(-12deg); opacity: 0.25; }
      }
      .hero-line.hero-line-1 { animation: heroLineMove1 4s ease-in-out infinite; }
      .hero-line.hero-line-2 { animation: heroLineMove2 5s ease-in-out infinite; }
      .hero-line.hero-line-3 { animation: heroLineMove3 4.5s ease-in-out infinite; }
      .hero-line.hero-line-4 { animation: heroLineMove4 6s ease-in-out infinite; }
      .hero-line.hero-line-5 { animation: heroLineMove5 4.2s ease-in-out infinite; }
      .hero-line.hero-line-6 { animation: heroLineMove6 5.2s ease-in-out infinite; }
      .hero-line.hero-line-7 { animation: heroLineMove7 4.8s ease-in-out infinite; }
      .hero-line.hero-line-8 { animation: heroLineMove8 6.2s ease-in-out infinite; }
      .hero-line.hero-line-9 { animation: heroLineMove9 5.8s ease-in-out infinite; }
      @keyframes hero-float {
        0% { transform: translate(-50%, -50%) translateY(0); }
        50% { transform: translate(-50%, -50%) translateY(-18px); }
        100% { transform: translate(-50%, -50%) translateY(0); }
      }
      .animate-hero-float { animation: hero-float 4.5s ease-in-out infinite; }
      @keyframes hero-rotate {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      .animate-hero-rotate { animation: hero-rotate 18s linear infinite; }
    `}</style>
  );
}
