import { Card, CardHeader } from "@/components/ui/card";
import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const TopRated = ({ premiumProfile }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 py-4 w-[90%] mx-auto">
      {premiumProfile?.map((profile) => (
        <div key={profile?.id} className="parent mx-auto">
          <div className="card">
            <div className="logo">
              <span className="circle circle1"></span>
              <span className="circle circle2"></span>
              <span className="circle circle3"></span>
              <span className="circle circle4"></span>
              <span className="circle circle5 uppercase text-white font-semibold">
                {profile?.fullName.charAt(0)}
                {profile?.fullName.charAt(1)}
              </span>
            </div>
            <div className="glass"></div>
            <div className="content">
              <span className="title capitalize">{profile?.fullName}</span>
              <span className="text">{profile?.preferredJobLocation}</span>
              <div className="flex gap-2 overflow-x-auto">
                {profile?.skills
                  ?.split(",")
                  .slice(0, 3)
                  .map((skillItem, i) => (
                    <div key={i}>
                      <p className="text-[13px] font-medium">{skillItem}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="bottom">
              <div className="social-buttons-container">
                <button className="social-button hover:text-white .social-button1">
                  <FaInstagram className=" " />
                </button>
                <button className="social-button .social-button2">
                  <FaFacebook />
                </button>
                <button className="social-button .social-button3">
                  <FaWhatsapp />
                </button>
              </div>
              <div className="view-more">
                <button className="view-more-button">View more</button>
                <svg
                  className="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRated;
