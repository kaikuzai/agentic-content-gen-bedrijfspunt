import os 
import json
from langchain_openai import AzureChatOpenAI
from dotenv import load_dotenv
from typing_extensions import TypedDict
from typing import List, Literal
from pydantic import BaseModel, Field

from IPython.display import Image, display

from langgraph.graph import StateGraph, START, END

try:
    from .agent_prompts import FRONTEND_PROMPT, BACKEND_PROMPT, INFRA_PROMPT, ASSESSMENT_PROMPT, TICKET_PROMPT
except ImportError:
    from agent_prompts import FRONTEND_PROMPT, BACKEND_PROMPT, INFRA_PROMPT, ASSESSMENT_PROMPT, TICKET_PROMPT

from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

# Define structured output models
class Ticket(BaseModel):
    ticket_type: Literal["frontend", "backend", "infra"] = Field(description="The technical domain of the ticket")
    number: int = Field(description="Sequential ticket number")
    title: str = Field(description="Concise title of the task")
    description: str = Field(description="Detailed description of the task")

class TicketList(BaseModel):
    tickets: List[Ticket]

class AgentState(TypedDict):
    user_request: str
    request_assessment: str
    backend_specifications: str 
    frontend_specifications: str 
    infrastructure_specifications: str
    software_tickets: dict  # This will now hold the structured dictionary

agent = AzureChatOpenAI(
    azure_deployment="gpt-4o-mini",
    api_version=os.getenv("OPENAI_API_VERSION"),
)


# Specialist agent responses 
def assessment_agent(state: AgentState):
    messages = [
        SystemMessage(content=ASSESSMENT_PROMPT), 
        HumanMessage(content=state["user_request"])
    ]
    response = agent.invoke(messages)
    return {"request_assessment": response.content}

def frontend_agent(state: AgentState):
    messages = [
        SystemMessage(content=FRONTEND_PROMPT),
        HumanMessage(content=state["user_request"])
    ]
    response = agent.invoke(messages)
    return {"frontend_specifications": response.content}

def backend_agent(state: AgentState):
    messages = [
        SystemMessage(content=BACKEND_PROMPT),
        HumanMessage(content=state["user_request"])
    ]
    response = agent.invoke(messages)
    return {"backend_specifications": response.content}

def infrastructure_agent(state: AgentState):
    messages = [
        SystemMessage(content=INFRA_PROMPT),
        HumanMessage(content=state["user_request"])
    ]
    response = agent.invoke(messages)
    return {"infrastructure_specifications": response.content}

## Aggregation and ticket writing 
def ticket_agent(state: AgentState):
    content = f"""
    Frontend specificaties: {state.get("frontend_specifications")}    
    Backend specificaties: {state.get("backend_specifications")}
    Infra specificaties: {state.get("infrastructure_specifications")}  
    """
    messages = [
        SystemMessage(content=TICKET_PROMPT),
        HumanMessage(content=content)
    ]
    
    # Use structured output to get JSON
    structured_llm = agent.with_structured_output(TicketList)
    response = structured_llm.invoke(messages)
    
    # Return as a dictionary
    return {"software_tickets": response.model_dump()}

workflow = StateGraph(AgentState)

workflow.add_node("frontend", frontend_agent)
workflow.add_node("backend", backend_agent)
workflow.add_node("infra", infrastructure_agent)
workflow.add_node("assessor", assessment_agent)
workflow.add_node("aggregator", ticket_agent)

# Start all three technical agents in parallel
workflow.add_edge(START, "assessor")
workflow.add_edge(START, "frontend")
workflow.add_edge(START, "backend")
workflow.add_edge(START, "infra")

# All three must finish before aggregator runs
workflow.add_edge("assessor", "aggregator")
workflow.add_edge("frontend", "aggregator")
workflow.add_edge("backend", "aggregator")
workflow.add_edge("infra", "aggregator")

workflow.add_edge("aggregator", END)

app = workflow.compile()

def main():


    user_input = "I want to build a restaurant reservation system where users can book tables and owners can manage bookings."
    
    result = app.invoke({"user_request": user_input})
    
    # Construct the final output structure
    final_output = {
        "assessment": result["request_assessment"],
        "tickets": result["software_tickets"]["tickets"]
    }

    print(json.dumps(final_output, indent=2))

if __name__ == '__main__':
    main()
