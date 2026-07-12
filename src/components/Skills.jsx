function Skills({ skillList }) {
  return (
    <section className="skills-section">
      <div className="card">
        <h2 className="section-title">🛠️ Skills</h2>
        <ul className="skills-list">
          {skillList.map((s) => (
            <li key={s} className="skill-item">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;
