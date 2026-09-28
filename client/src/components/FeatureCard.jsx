import React from "react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <span className="feature-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

export default FeatureCard;
