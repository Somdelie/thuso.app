import React from "react";

const ActivityCard = ({ finalFilteredItem }) => {
  return (
    <div className="card8 shadow bg-white border">
      <p className="card__title">
        {finalFilteredItem?.title?.substring(0, 25)}...
      </p>
      <div className="card__content">
        <p className="card__title">
          {finalFilteredItem?.title?.substring(0, 30)}...
        </p>
        <p className="card__description">
          {finalFilteredItem?.description?.substring(0, 150)}...
        </p>
      </div>
      <span> </span>
    </div>
  );
};

export default ActivityCard;
