from rest_framework.views import APIView
from rest_framework import permissions, status 
from rest_framework.response import Response
from .agent_workflows.generate_idea import app


# Create your views here.
class GenerateIdea(APIView):

    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        idea = request.data.get("idea")
        cloud_provider = request.data.get("cloudProvider", "Azure")
        user_count = request.data.get("userCount", "10000")

        if not idea:
            return Response({"error": "Please provide an idea"}, status=status.HTTP_400_BAD_REQUEST)

        # Combine idea and cloud provider for the agent
        user_input = f"Idea: {idea}. Preferred Cloud Provider: {cloud_provider}, user count: {user_count}"

        try:
            # Invoke the LangGraph workflow
            result = app.invoke({"user_request": user_input})
            
            # Structure the response
            response_data = {
                "assessment": result["request_assessment"],
                "tickets": result["software_tickets"]["tickets"]
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
