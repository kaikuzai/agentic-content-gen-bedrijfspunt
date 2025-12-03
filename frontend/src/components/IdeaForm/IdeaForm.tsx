import React, { useState, useEffect } from "react";
import "./IdeaForm.css";
import {
  useGenerateIdea,
  type CloudProvider,
} from "../../hooks/useGenerateIdea";

export type userCount = "1000" | "10000" | "more than 100000" | "unknown";

interface IdeaFormProps {
  onSuccess: (data: any) => void;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onSuccess }) => {
  const [idea, setIdea] = useState<string>("");
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>("AZURE");
  const [userCount, setUserCount] = useState<userCount>("unknown");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { generateIdea, isLoading, error: apiError, data } = useGenerateIdea();

  const MIN_CHARS = 40;
  const currentLength = idea.length;
  const isLengthValid = currentLength >= MIN_CHARS;
  const charsLeft = Math.max(0, MIN_CHARS - currentLength);

  useEffect(() => {
    if (data) {
      onSuccess(data);
    }
  }, [data, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!idea.trim()) {
      setValidationError("Please enter a product idea.");
      return;
    }

    if (!isLengthValid) {
      setValidationError(`Please enter at least ${MIN_CHARS} characters.`);
      return;
    }

    await generateIdea(idea, cloudProvider, userCount);
  };

  const error = validationError || apiError;

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
          <option value="1000">duizend bezoekers</option>
          <option value="10000">tienduizend bezoekers</option>
          <option value="more than 100000">honderduizend bezoekers +</option>
          <option value="unknown">onbekend</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="idea">Product Idee</label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Bijvoorbeeld: Ik wil een platform waarbij mensen online winkels kunnen hosten en internationaal kleding kunnen verkopen"
          rows={12}
          disabled={isLoading}
        />
        {currentLength < 40 && (
          <div className={`char-count ${isLengthValid ? "valid" : "invalid"}`}>
            {isLengthValid
              ? `${currentLength} karakters`
              : `${charsLeft} meer karakters nodig`}
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        type="submit"
        disabled={isLoading || !isLengthValid}
        className={"submit-btn"}
      >
        {isLoading ? "Laden ..." : "Verzenden"}
      </button>
    </form>
  );
};
