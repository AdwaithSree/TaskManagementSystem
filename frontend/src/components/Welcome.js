import React from 'react';

import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {

  const navigate = useNavigate();

  return (

    <div className="welcome-page">

      <div className="welcome-glow glow-1"></div>

      <div className="welcome-glow glow-2"></div>

      <div className="welcome-card">

        <div className="welcome-tag">
          Modern Productivity Platform
        </div>

        <div className="welcome-logo">
          TaskFlow
        </div>

        <h1>
          Manage Tasks
          <br />
          With Better Workflow
        </h1>

        <p>
          Organize projects, manage priorities,
          track progress, and improve productivity
          using a modern task management workspace.
        </p>

        <div className="welcome-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate('/register')}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>

  );
}

export default Welcome;