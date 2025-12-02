import React, { useState } from "react";
import "./IdeaForm.css";

export type CloudProvider = "AZURE" | "GCP" | "AWS";
export type userCount = "1.000" | "10.000" | "100.000+" | "unknown";

interface IdeaFormProps {
  onSuccess: (data: any) => void;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onSuccess }) => {
  const [idea, setIdea] = useState<string>("");
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>("AZURE");
  const [userCount, setUserCount] = useState<userCount>("unknown");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <div className="form-group">
        <label htmlFor="cloudProvider">Kies een cloud provider</label>
        <select
          id="cloudProvider"
          value={cloudProvider}
          onChange={(e) => setCloudProvider(e.target.value as CloudProvider)}
          disabled={isLoading}
        >
          <option value="AZURE">Azure (Microsoft)</option>
          <option value="GCP">GCP (Google)</option>
          <option value="AWS">AWS (Amazon)</option>
        </select>
        <label htmlFor="usercount">
          {" "}
          Hoeveel bezoekers verwacht je per dag?
        </label>
        <select
          id="userCount"
          value={userCount}
          onChange={(e) => setUserCount(e.target.value as userCount)}
          disabled={isLoading}
        >
          <option value="1.000">duizend bezoekers</option>
          <option value="10.000">tienduizend bezoekers</option>
          <option value="100.000+">honderduizend bezoekers +</option>
          <option value="unknown">onbekend</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="idea">Product Idea</label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="I want an online restaurant reservation service..."
          rows={8}
          disabled={isLoading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        type="submit"
        disabled={isLoading || !idea.trim()}
        className={"submit-btn"}
      >
        {isLoading ? "Laden ..." : "Verzenden"}
      </button>
    </form>
  );
};
