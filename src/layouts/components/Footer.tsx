import React from 'react';

interface FooterProps {
  text: string;
}

export const Footer: React.FC<FooterProps> = ({ text }) => (
  <footer id="footer">
    <div>{text}</div>
  </footer>
);
