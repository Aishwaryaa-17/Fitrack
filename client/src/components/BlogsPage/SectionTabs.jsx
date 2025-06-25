import React from "react";
import styled from "styled-components";

const sections = ["Tutorials", "Diet", "Gym", "Mind"];

const SectionTabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
`;

const SectionButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 3px solid ${({ theme }) => theme.primary};
  }
`;

const SectionTabs = ({ active, onChange }) => {
  return (
    <SectionTabsContainer>
      {sections.map((sec) => (
        <SectionButton
          key={sec}
          onClick={() => onChange(sec)}
          className={active === sec ? "active" : ""}
        >
          {sec}
        </SectionButton>
      ))}
    </SectionTabsContainer>
  );
};

export default SectionTabs;
