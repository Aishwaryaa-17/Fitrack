import React from 'react';
import Tutorials from './sections/Tutorials';
import Diet from './sections/Diet';
import Gym from './sections/Gym'; 
import Mind from './sections/Mind';

const SectionContent = ({ section, subsection }) => {
  const sectionsMap = {
    Tutorials: Tutorials,
    Diet: Diet,
    Gym: Gym,
    Mind: Mind,
  };

  const SectionComponent = sectionsMap[section];
  return <SectionComponent type={subsection} />;
};

export default SectionContent;
