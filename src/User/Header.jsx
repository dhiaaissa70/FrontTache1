import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../Component/UI/Modal";
import { SearchGames } from "./SearchGames";
import "../css/Header.css";

const Header = ({ openSearchModal }) => {
  const navItems = [
    {
      path: "/game",
      label: "Lobby",
      icon: "",
    },
    {
      path: "/featured",
      label: "Featured",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_featured.svg&w=160&q=75",
    },
    {
      path: "/new",
      label: "New",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_new%20(1).svg&w=160&q=75",
    },
    {
      path: "/slots",
      label: "Slots",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_slots.svg&w=160&q=75",
    },
    {
      path: "/crash",
      label: "Crash",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Crash.svg&w=160&q=75",
    },
    {
      path: "/providers",
      label: "Providers",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_providers.svg&w=160&q=75",
    },
    {
      path: "/livecasino",
      label: "Live Casino",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75",
    },
    {
      path: "/amatic",
      label: "Amatic",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75",
    },
    {
      path: "/pragmatic",
      label: "Pragmatic",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_pragmatic.svg&w=160&q=75",
    },
    {
      path: "/othergames",
      label: "Other Games",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Keno.svg&w=160&q=75",
    },
  ];
  return (
    <>
      <header className="casino-header bg-[#383838] text-white py-2 px-4 md:py-2 shadow-md">
        <style jsx>{`
          .casino-header nav a.active img,
          .casino-header nav a:hover img {
            filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
          }
          .casino-header nav a.active svg,
          .casino-header nav a:hover svg {
            fill: yellow !important;
          }
        `}</style>
        <div className="flex items-center">
          {/* Navigation Items */}
          <nav className="flex items-center gap-4 px-2 overflow-x-auto md:gap-6 md:px-4 md:justify-center whitespace-nowrap scrollbar-hide">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 md:gap-2 px-2 py-1 md:px-2 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                    isActive ? "bg-[#1c1c1c] text-primary-yellow active" : "text-gray-300 hover:text-yellow-400 hover:bg-[#1c1c1c]"
                  }`
                }
              >
                <span role="img" aria-label={item.label} className="icon transition-transform">
                  {item?.icon?.includes("http") ? (
                    <img src={item?.icon} alt={item.label} className="w-4 h-4 md:w-6 md:h-6" />
                  ) : item.label === "Lobby" ? (
                    <svg className="fill-white" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.7291 14.1608C19.7291 14.3265 19.5948 14.4608 19.4291 14.4608H18.7776C18.612 14.4608 18.4776 14.3265 18.4776 14.1608V5.8895C18.4776 5.72381 18.612 5.5895 18.7776 5.5895H19.4291C19.5948 5.5895 19.7291 5.72381 19.7291 5.8895V14.1608Z"></path>
                      <path d="M22.5988 22.2835C22.5988 22.4492 22.4645 22.5835 22.2988 22.5835H21.4354C21.2697 22.5835 21.1354 22.4492 21.1354 22.2835V10.9073C21.1354 10.7416 21.2697 10.6073 21.4354 10.6073H22.2988C22.4645 10.6073 22.5988 10.7416 22.5988 10.9073V22.2835Z"></path>
                      <path d="M19.7291 22.2835C19.7291 22.4492 19.5948 22.5835 19.4291 22.5835H16.1263C15.9606 22.5835 15.8264 22.4493 15.8263 22.2837L15.8246 19.1231C15.8245 18.9574 15.9589 18.823 16.1246 18.823H16.3683C16.7566 18.823 17.0714 18.5082 17.0714 18.1199C17.0714 17.4101 16.9261 16.8756 16.6624 16.3214C16.5638 16.1143 16.7083 15.867 16.9377 15.867H17.7501C17.7534 15.8671 17.7568 15.8673 17.7601 15.8676C17.7649 15.8679 17.7697 15.8682 17.7745 15.8682C17.7794 15.8682 17.7841 15.8679 17.7889 15.8676C17.7923 15.8673 17.7956 15.8671 17.799 15.867H19.4291C19.5948 15.867 19.7291 16.0013 19.7291 16.167V22.2835Z"></path>
                      <path d="M14.42 22.2833C14.4201 22.4491 14.2858 22.5835 14.12 22.5835H12.9982C12.8326 22.5835 12.6983 22.4493 12.6982 22.2837L12.6965 19.1231C12.6965 18.9574 12.8308 18.823 12.9965 18.823H14.1184C14.284 18.823 14.4183 18.9572 14.4184 19.1228L14.42 22.2833Z"></path>
                      <path d="M11.292 22.2833C11.2921 22.4491 11.1577 22.5835 10.992 22.5835H9.87012C9.7045 22.5835 9.57021 22.4493 9.57012 22.2837L9.56847 19.1231C9.56838 18.9574 9.70272 18.823 9.86847 18.823H10.9903C11.1559 18.823 11.2902 18.9572 11.2903 19.1228L11.292 22.2833Z"></path>
                      <path d="M8.7549 17.6445C8.56621 17.6445 8.42382 17.4718 8.47818 17.2911C8.93295 15.7797 10.3376 14.6757 11.9952 14.6757C13.6529 14.6757 15.0575 15.7797 15.5123 17.2911C15.5667 17.4718 15.4243 17.6445 15.2356 17.6445H8.7549Z"></path>
                      <path d="M8.16385 22.2833C8.16393 22.4491 8.02959 22.5835 7.86385 22.5835H4.51216C4.34647 22.5835 4.21216 22.4492 4.21216 22.2835V16.167C4.21216 16.0013 4.34647 15.867 4.51216 15.867H6.19148C6.19486 15.8671 6.19821 15.8673 6.20156 15.8676C6.20381 15.8677 6.20607 15.8679 6.20834 15.868C6.21086 15.8681 6.21339 15.8682 6.21595 15.8682C6.22078 15.8682 6.22554 15.8679 6.2303 15.8676C6.23366 15.8673 6.23702 15.8671 6.24041 15.867H7.05278C7.2822 15.867 7.4266 16.1143 7.3277 16.3213C7.06292 16.8754 6.91512 17.41 6.91512 18.1199C6.91512 18.5082 7.22993 18.823 7.61824 18.823H7.86223C8.02786 18.823 8.16215 18.9572 8.16223 19.1228L8.16385 22.2833Z"></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.91906 5.06877C6.91906 5.03254 6.92556 4.99654 6.93867 4.96277C7.33418 3.94375 7.98369 3.07787 8.82629 2.45196C9.73856 1.77425 10.8343 1.41599 11.9952 1.41599C13.1561 1.41599 14.252 1.77425 15.1642 2.45196C16.0068 3.07791 16.6563 3.94375 17.0518 4.96277C17.0649 4.99654 17.0714 5.03254 17.0714 5.06877V14.1608C17.0714 14.3265 16.9371 14.4608 16.7714 14.4608H15.3687C15.2981 14.4608 15.2299 14.4356 15.1749 14.3913C14.304 13.6899 13.1979 13.2695 11.9952 13.2695C10.7926 13.2695 9.68649 13.6899 8.8156 14.3913C8.76057 14.4356 8.6924 14.4608 8.62174 14.4608H7.21906C7.05338 14.4608 6.91906 14.3265 6.91906 14.1608V5.06877ZM8.16385 22.2833C8.16393 22.4491 8.02959 22.5835 7.86385 22.5835H4.51216C4.34647 22.5835 4.21216 22.4492 4.21216 22.2835V16.167C4.21216 16.0013 4.34647 15.867 4.51216 15.867H6.19148L6.20156 15.8676L6.20834 15.868L6.21595 15.8682C6.22078 15.8682 6.22554 15.8679 6.2303 15.8676L6.24041 15.867H7.05278C7.2822 15.867 7.4266 16.1143 7.3277 16.3213C7.06292 16.8754 6.91512 17.41 6.91512 18.1199C6.91512 18.5082 7.22993 18.823 7.61824 18.823H7.86223C8.02786 18.823 8.16215 18.9572 8.16223 19.1228L8.16385 22.2833ZM11.292 22.2833C11.2921 22.4491 11.1577 22.5835 10.992 22.5835H9.87012C9.7045 22.5835 9.57021 22.4493 9.57012 22.2837L9.56847 19.1231C9.56838 18.9574 9.70272 18.823 9.86847 18.823H10.9903C11.1559 18.823 11.2902 18.9572 11.2903 19.1228L11.292 22.2833ZM14.42 22.2833C14.4201 22.4491 14.2858 22.5835 14.12 22.5835H12.9982C12.8326 22.5835 12.6983 22.4493 12.6982 22.2837L12.6965 19.1231C12.6965 18.9574 12.8308 18.823 12.9965 18.823H14.1184C14.284 18.823 14.4183 18.9572 14.4184 19.1228L14.42 22.2833ZM8.7549 17.6445C8.56621 17.6445 8.42382 17.4718 8.47818 17.2911C8.93295 15.7797 10.3376 14.6757 11.9952 14.6757C13.6529 14.6757 15.0575 15.7797 15.5123 17.2911C15.5667 17.4718 15.4243 17.6445 15.2356 17.6445H8.7549ZM19.7291 22.2835C19.7291 22.4492 19.5948 22.5835 19.4291 22.5835H16.1263C15.9606 22.5835 15.8264 22.4493 15.8263 22.2837L15.8246 19.1231C15.8245 18.9574 15.9589 18.823 16.1246 18.823H16.3683C16.7566 18.823 17.0714 18.5082 17.0714 18.1199C17.0714 17.4101 16.9261 16.8756 16.6624 16.3214C16.5638 16.1143 16.7083 15.867 16.9377 15.867H17.7501L17.7601 15.8676C17.7649 15.8679 17.7697 15.8682 17.7745 15.8682C17.7794 15.8682 17.7841 15.8679 17.7889 15.8676L17.799 15.867H19.4291C19.5948 15.867 19.7291 16.0013 19.7291 16.167V22.2835ZM19.7291 14.1608C19.7291 14.3265 19.5948 14.4608 19.4291 14.4608H18.7776C18.612 14.4608 18.4776 14.3265 18.4776 14.1608V5.8895C18.4776 5.72381 18.612 5.5895 18.7776 5.5895H19.4291C19.5948 5.5895 19.7291 5.72381 19.7291 5.8895V14.1608ZM22.5988 22.2835C22.5988 22.4492 22.4645 22.5835 22.2988 22.5835H21.4354C21.2697 22.5835 21.1354 22.4492 21.1354 22.2835V10.9073C21.1354 10.7416 21.2697 10.6073 21.4354 10.6073H22.2988C22.4645 10.6073 22.5988 10.7416 22.5988 10.9073V22.2835ZM11.5508 4.25069C11.5508 5.08815 10.9057 5.61183 10.2222 6.16605L10.2202 6.16775C9.54728 6.7146 8.85181 7.27981 8.85181 8.17651C8.85181 9.45195 9.4573 10.0984 10.6511 10.0984C10.8559 10.0979 11.0601 10.0723 11.2588 10.0217C11.013 10.4904 10.5944 10.8454 10.092 11.0114C9.85249 11.073 9.70806 11.3163 9.76802 11.5561C9.82818 11.7959 10.0344 11.8974 10.3118 11.8974L13.7962 11.8974L13.7998 11.8974C14.025 11.8949 14.2134 11.7262 14.241 11.5028C14.2685 11.2795 14.1268 11.07 13.9091 11.0126C13.4073 10.846 12.9897 10.4911 12.7437 10.0231C12.9419 10.0729 13.1455 10.098 13.3498 10.0984C14.5438 10.0984 15.1491 9.45195 15.1491 8.17651C15.1491 7.27888 14.4533 6.71343 13.7787 6.16605C13.0954 5.61183 12.4503 5.08815 12.4503 4.25069C12.4503 4.00217 12.2488 3.80075 12.0004 3.80075C11.7519 3.80075 11.5508 4.00217 11.5508 4.25069Z"
                      ></path>
                      <path d="M4.51216 5.5895H5.21283C5.37851 5.5895 5.51283 5.72381 5.51283 5.8895V14.1608C5.51283 14.3265 5.37851 14.4608 5.21283 14.4608H4.51216C4.34647 14.4608 4.21216 14.3265 4.21216 14.1608V5.8895C4.21216 5.72381 4.34647 5.5895 4.51216 5.5895Z"></path>
                      <path d="M2.50592 22.5835H1.70161C1.53593 22.5835 1.40161 22.4492 1.40161 22.2835V10.9073C1.40161 10.7416 1.53593 10.6073 1.70161 10.6073H2.50592C2.67161 10.6073 2.80592 10.7416 2.80592 10.9073V22.2835C2.80592 22.4492 2.67161 22.5835 2.50592 22.5835Z"></path>
                    </svg>
                  ) : (
                    item.icon
                  )}
                </span>
                <span className="text-center">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="flex justify-center ml-auto md:block hidden">
            <div className="relative w-52">
              <input
                onClick={() => openSearchModal(true)}
                type="button"
                value="Search"
                className="cursor-pointer w-full text-left bg-white text-gray-800 pl-8 pr-3 py-2 rounded-[8px] shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#000" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
