import React, { useState, useEffect } from "react";
import './Skills.css';

const skillsData = {
  "Front-End": [
    { name: "HTML/CSS", level: 90 },
    { name: "React", level: 85 },
    { name: "JavaScript", level: 85 },
    { name: "Wordpress", level: 75 },
    { name: "PHP", level: 65 },
  ],
  "Back-End": [
    { name: "Node.js", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "Express.js", level: 72 },
    { name: "Python", level: 68 },
    { name: "SQL SERVER", level: 65 },
  ],
  "Design": [
    { name: "UI/UX", level: 90 },
    { name: "Figma", level: 85 },
    { name: "Adobe XD", level: 80 },
    { name: "Power BI", level: 75 }, // Se for usado para criar dashboards visuais
    { name: "Photoshop", level: 65 },
  ],
};


const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("Front-End");
  const [animatedLevels, setAnimatedLevels] = useState({});

  useEffect(() => {
    const newLevels = {};
    skillsData[selectedCategory].forEach((skill) => {
      newLevels[skill.name] = 0;
    });
    setAnimatedLevels(newLevels);

    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedLevels((prevLevels) => {
          const updatedLevels = { ...prevLevels };
          let allDone = true;
          skillsData[selectedCategory].forEach((skill) => {
            if (updatedLevels[skill.name] < skill.level) {
              updatedLevels[skill.name] += 5; // Aumento mais rápido no início
              if (updatedLevels[skill.name] > skill.level) {
                updatedLevels[skill.name] = skill.level;
              }
              allDone = false;
            }
          });
          if (allDone) clearInterval(interval);
          return updatedLevels;
        });
      }, 10); // Redução do tempo de atualização para acelerar
    }, 100); // Menor delay inicial
  }, [selectedCategory]);

  return (
    <div className="container-global-skills">
      <div className="titles_background">
          <h2 className="background-title-skills">Habilidades</h2>
          <h1 className="main-title obj">Skills</h1>
      </div>

      <div className="skills-container">

      {/* Sidebar - Categorias */}
      <div className="skills-sidebar">
        {Object.keys(skillsData).map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active obj" : "obj"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Lista de Skills */}
      <div className="skills-list">
        {skillsData[selectedCategory].map((skill) => (
          <div key={skill.name} className="skill-item">
            <div className="skill-header">
              <span>{skill.name}</span>
              <span>{animatedLevels[skill.name] || 0}%</span>
            </div>
            <div className="skill-bar">
              <div
                className="skill-fill"
                style={{ width: `${animatedLevels[skill.name] || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Skills;
