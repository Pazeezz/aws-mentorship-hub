from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    learning_outcomes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


QUESTION_TYPES = (
    ("bug", "Bug"),
    ("stuck", "Stuck Point"),
    ("general", "General Question"),
)

QUESTION_STATUS = (
    ("open", "Open"),
    ("answered", "Answered"),
)

class Question(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="questions")
    student_name = models.CharField(max_length=150)
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default="general")
    content = models.TextField()
    file = models.FileField(upload_to="qa_attachments/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=QUESTION_STATUS, default="open")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.student_name}: {self.content[:30]}..."


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers")
    instructor_name = models.CharField(max_length=150, default="Instructor")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self) -> str:
        return f"Answer to {self.question}"
