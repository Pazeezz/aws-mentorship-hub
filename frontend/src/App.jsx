import { useState, useEffect } from "react";
import { fetchProjects, fetchQuestions, createQuestion, checkBackendHealth, updateQuestion } from "./api";
import "./styles.css";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState("checking");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    student_name: "",
    question_type: "general",
    content: "",
    file: null,
  });

  useEffect(() => {
    loadData();
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      await checkBackendHealth();
      setHealth("healthy");
    } catch {
      setHealth("unhealthy");
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const projData = await fetchProjects();
      const qData = await fetchQuestions();
      
      if (projData && projData.length > 0) {
        setActiveProject(projData[0]);
      }
      setQuestions(qData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openAskModal = () => {
    setEditingId(null);
    setFormData({ student_name: "", question_type: "general", content: "", file: null });
    setModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingId(q.id);
    setFormData({ student_name: q.student_name, question_type: q.question_type, content: q.content, file: null });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeProject) {
      alert("No active project configured. Cannot submit.");
      return;
    }
    
    try {
      const data = new FormData();
      data.append("project", activeProject.id);

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      if (editingId) {
        await updateQuestion(editingId, data);
      } else {
        await createQuestion(data);
      }
      
      setModalOpen(false);
      setFormData({ student_name: "", content: "", file: null });
      setEditingId(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Check console.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        {activeProject ? (
          <>
            <h1>{activeProject.title}</h1>
            <p className="project-desc">{activeProject.description}</p>
            
            {activeProject.learning_outcomes && (
              <div className="learning-outcomes">
                <h3>📚 Learning Outcomes</h3>
                <p>{activeProject.learning_outcomes}</p>
              </div>
            )}
            
            <div style={{ marginTop: "2rem" }}>
              <button 
                onClick={openAskModal}
                style={{ maxWidth: "250px", fontSize: "1.1rem" }}
              >
                Let's Ask a Question
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>AWS Mentorship Hub</h1>
            <p className="project-desc">Welcome! Please hold on or ask the instructor to create a Project in the backend.</p>
          </>
        )}
      </section>

      {/* Community Feed */}
      <div className="questions-header">
        <h2>Community Q&A</h2>
        <div style={{ fontSize: "0.8rem", color: health === "healthy" ? "#059669" : "#dc2626", fontWeight: 600 }}>
          API: {health.toUpperCase()}
        </div>
      </div>

      <section className="questions-list">
        {loading ? <p>Loading thread...</p> : (
          questions.length === 0 ? <p style={{color: '#64748b'}}>No questions have been posted yet. Be the first!</p> : questions.map((q) => (
            <div key={q.id} className="question-card">
              
              <div className="question-header">
                <div>
                  <div className="student-name">{q.student_name}</div>
                  <div className="timestamp">🕒 {formatDate(q.created_at)}</div>
                </div>
                <div className="badges">
                  <span className={`badge ${q.question_type}`}>{q.question_type === "bug" ? "Bug" : q.question_type === "stuck" ? "Stuck" : "General"}</span>
                  <span className={`badge ${q.status}`}>{q.status}</span>
                  <button className="edit-btn" onClick={() => openEditModal(q)}>✏️ Edit</button>
                </div>
              </div>
              
              <div className="question-body">
                {q.content}
                {q.file && (
                  <div>
                    <a href={q.file} target="_blank" rel="noopener noreferrer" className="attachment-link">
                      📎 View Uploaded Attachment
                    </a>
                  </div>
                )}
              </div>

              {q.answers && q.answers.length > 0 && (
                <div className="answers-section">
                  {q.answers.map((a) => (
                    <div key={a.id} className="answer">
                      <div className="answer-header">
                        <div className="answer-author">
                          {a.instructor_name} <span className="admin-badge">Admin</span>
                        </div>
                        <div className="timestamp">🕒 {formatDate(a.created_at)}</div>
                      </div>
                      <div style={{ whiteSpace: "pre-wrap", color: "#1e293b", fontSize: "0.95rem" }}>
                        {a.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))
        )}
      </section>

      {/* Pop-up Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? "Edit your Question" : "Ask a Question / Report an Issue"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name (Optional / Anonymous)</label>
                <input 
                  type="text" 
                  name="student_name" 
                  value={formData.student_name} 
                  onChange={handleChange} 
                  placeholder="E.g. John Doe or 'Anonymous'" 
                  required
                />
              </div>

              <div className="form-group">
                <label>Question Type</label>
                <select name="question_type" value={formData.question_type} onChange={handleChange}>
                  <option value="general">General Question</option>
                  <option value="bug">Bug / Error</option>
                  <option value="stuck">Stuck Point</option>
                </select>
              </div>

              <div className="form-group">
                <label>Describe your question or issue in detail</label>
                <textarea
                  name="content"
                  rows="5"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="I followed the tutorial until step 4..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Attach Screenshot / Logs (Optional)</label>
                <input type="file" name="file" onChange={handleChange} />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit">{editingId ? "Save Changes" : "Submit Question"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}
