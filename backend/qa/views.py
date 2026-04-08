from rest_framework import viewsets, permissions
from .models import Project, Question, Answer
from .serializers import ProjectSerializer, QuestionSerializer, AnswerSerializer
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.select_related("project").prefetch_related("answers").all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Mark question as answered automatically
        answer = serializer.save()
        question = answer.question
        question.status = "answered"
        question.save()
