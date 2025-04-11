// components/FancyTitle.jsx
const FancyTitle = ({ background, title }) => {
    return (
      <div className="titles_background  projects-title">
        <h2 className="background-title">{background}</h2>
        <h1 className="main-title obj">{title}</h1>
      </div>
    );
  };
  
  export default FancyTitle;
  