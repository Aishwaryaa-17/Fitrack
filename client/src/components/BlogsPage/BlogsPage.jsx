import React, { useState } from "react";
import SectionTabs from "./SectionTabs";
import SubsectionTabs from "./SubsectionTabs";
import SectionContent from "./SectionContent";

const BlogsPage = () => {
  const [activeSection, setActiveSection] = useState("Tutorials");
  const [activeSubsection, setActiveSubsection] = useState("Videos");

  return (
    <div style={{ padding: "20px", overflow: "auto" }}>
      <SectionTabs active={activeSection} onChange={setActiveSection} />
      <SubsectionTabs active={activeSubsection} onChange={setActiveSubsection} />
      <SectionContent section={activeSection} subsection={activeSubsection} />
    </div>
  );
};

export default BlogsPage;