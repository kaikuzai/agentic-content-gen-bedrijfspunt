from django.urls import path 
from .views import GenerateIdea

urlpatterns = [ 
    path("generate-idea/", GenerateIdea.as_view() ,name="idea gen"), 
]