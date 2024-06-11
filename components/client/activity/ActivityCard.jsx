import React from "react";

const ActivityCard = ({ job }) => {
  console.log(job);
  return (
    <div className="card8 shadow bg-white border rounded h-[200px]">
      <h2 className="font-bold">{job?.title}</h2>
      <div className="card__content">
        <p className="card__title">{job?.location.substring(0, 45)}</p>
        <p className="card__description">
          {job?.description.substring(0, 165)}...
        </p>
      </div>
      <span> </span>
    </div>
  );
};

export default ActivityCard;
