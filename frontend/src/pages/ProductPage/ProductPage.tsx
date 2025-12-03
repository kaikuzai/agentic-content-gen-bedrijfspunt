import React from "react";
import "./ProductPage.css";

const ProductPage: React.FC = () => {
  return (
    <div className="product-page">
      <h1>Agentic Content Generator</h1>
      <p className="product-intro">
        Deze applicatie maakt gebruik van een Agentic AI in de backend om
        software product ideeën om te toveren naar gerichte tickets zodat je een
        beter grip krijgt op wat er allemaal komt kijken bij een software
        implementatie.
      </p>

      <div className="workflow-section">
        <h2>Hoe het werkt</h2>
        <div className="workflow-grid">
          <div className="workflow-steps">
            <div className="step">
              <h3>1. Input Analyse</h3>
              <p>
                Je input wordt als eerst door de frontend geanalyseerd zodat
                zeker is dat alle benodigde onderdelen erin staan. Vervolgens
                wordt hij doorgestuurd naar de Agentic backend.
              </p>
            </div>

            <div className="step">
              <h3>2. Parallelle Agents</h3>
              <p>
                Vier gespecialiseerde agents kijken tegelijkertijd naar je idee:
                <br />• <strong>Assessor:</strong> Evalueert de haalbaarheid en
                creëert een technisch overzicht.
                <br />• <strong>Frontend:</strong> Ontwerpt UI/UX componenten.
                <br />• <strong>Backend:</strong> Plant API's en datamodellen.
                <br />• <strong>Infra:</strong> Ontwerpt de cloud
                infrastructuur.
              </p>
            </div>

            <div className="step">
              <h3>3. Aggregatie & Output</h3>
              <p>
                Een Aggregator agent verzamelt alle inzichten en voegt deze
                samen tot een gestructureerde lijst van Jira-stijl tickets
                (Frontend, Backend, Infra) en een uitgebreide technische
                beoordeling.
              </p>
            </div>
          </div>

          <div className="workflow-image-container">
            <img
              src="/agent_workflow.png"
              alt="Agent Workflow Diagram"
              className="workflow-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
