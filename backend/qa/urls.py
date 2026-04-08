from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, QuestionViewSet, AnswerViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet)
router.register(r"questions", QuestionViewSet)
router.register(r"answers", AnswerViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
