from .models import Task
from rest_framework import viewsets, permissions
from .serializers import Taskserializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Taskserializer

    @action(detail=True, methods=['post'])
    def don(self, request, pk=None):
        task = self.get_object()
        task.done = not task.done
        task.save()
        return Response({
            'status': 'task done' if task.done else 'task uncode'
        }, status=status.HTTP_200_OK)


