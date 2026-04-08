from rest_framework import serializers
from .models import Project, Question, Answer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "question", "instructor_name", "content", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    project_title = serializers.CharField(source="project.title", read_only=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "project",
            "project_title",
            "student_name",
            "question_type",
            "content",
            "file",
            "status",
            "created_at",
            "updated_at",
            "answers",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "description", "learning_outcomes", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
