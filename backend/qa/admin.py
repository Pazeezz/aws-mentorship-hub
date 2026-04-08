from django.contrib import admin
from .models import Project, Question, Answer

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title",)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("student_name", "project", "question_type", "status", "created_at")
    list_filter = ("status", "question_type", "project")
    search_fields = ("student_name", "content")

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("instructor_name", "question", "created_at")
    search_fields = ("instructor_name", "content")
