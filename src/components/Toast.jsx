import React from 'react';
import { IconCheck } from './Icons.jsx';

export default function Toast({ show, text }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <IconCheck width="18" height="18" />
      <span>{text}</span>
    </div>
  );
}
