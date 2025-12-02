import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="info-card">
        <div className="profile-image-placeholder">
          {/* Image will go here */}
        </div>
        <h2>Gemaakt door Dylan Okyere</h2>
        <p className="subtitle">Student Business IT & Management</p>
        <p className="subtitle">
          Bedrijfspunt React webapplicatie en Agentic AI
        </p>

        <div className="description-text">
          <p>
            Veel ideeën blijven hangen op een hoog niveau: “Ik wil een
            reserveringssysteem” of “We hebben een intern portaal nodig”. Maar
            wat betekent dat precies voor de frontend, de backend en de
            cloud-infrastructuur?
          </p>
          <p>
            Deze applicatie helpt om die kloof te overbruggen. Jij beschrijft je
            idee, kiest een cloudomgeving (Azure, AWS of GCP), en het systeem
            vertaalt dit automatisch naar benodigde frontend-componenten,
            backend-onderdelen en infrastructuur-building blocks. Zo krijg je in
            één overzicht een technisch plan waar een team direct mee aan de
            slag kan.
          </p>
        </div>

        <button
          className="try-out-btn"
          onClick={() => navigate("/idea-breakdown")}
        >
          Uitproberen
        </button>
      </div>
    </div>
  );
};

export default HomePage;
