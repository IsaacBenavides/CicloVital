import React from 'react'
import './AvatarIA.css'

const AvatarIA = () => {
  return (
    <svg
  className="ai-avatar"
  viewBox="0 0 64 64"
  role="img"
  aria-label="Avatar IA"
  xmlns="http://www.w3.org/2000/svg"
>
  
  <circle className="ai-bg" cx="32" cy="32" r="30"/>


  <circle className="ai-ring" cx="32" cy="32" r="30" fill="none" stroke-width="2"/>

  <line className="ai-antenna" x1="32" y1="16" x2="32" y2="10" stroke-width="2" stroke-linecap="round"/>
  <circle className="ai-antenna-tip" cx="32" cy="8" r="3"/>

  <rect className="ai-face" x="17" y="18" width="30" height="28" rx="8" ry="8"/>

  <circle className="ai-eye" cx="26" cy="32" r="3"/>
  <circle className="ai-eye" cx="38" cy="32" r="3"/>

  <path className="ai-mouth" d="M24 39 Q32 44 40 39" fill="none" stroke-width="2" stroke-linecap="round"/>

  <path className="ai-spark" d="M49 18 l2 3 3 2-3 2-2 3-2-3-3-2 3-2z"/>
</svg>
  )
}

export default AvatarIA