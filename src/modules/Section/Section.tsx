import React from 'react';
import s from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className={s.main_content}>
      <section className={s.section}>{children}</section>
    </div>
  );
};

export default Section;
