from rest_framework import viewsets

from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status

from django.contrib.auth.models import User

from .models import Task

from .serializers import TaskSerializer


# TASK VIEWSET

class TaskViewSet(viewsets.ModelViewSet):

    serializer_class = TaskSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        return Task.objects.filter(
            user=self.request.user
        )


    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )


# REGISTER VIEW

class RegisterView(APIView):

    def post(self, request):

        username = request.data.get('username')

        email = request.data.get('email')

        password = request.data.get('password')


        if User.objects.filter(
            username=username
        ).exists():

            return Response(
                {
                    'error':'Username already exists'
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )


        return Response(
            {
                'message':'User created successfully'
            },
            status=status.HTTP_201_CREATED
        )