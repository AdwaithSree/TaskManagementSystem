from rest_framework import serializers

from .models import Task


class TaskSerializer(
    serializers.ModelSerializer
):


    # TITLE VALIDATION
    def validate_title(
        self,
        value
    ):

        value = value.strip()

        if len(value) < 3:

            raise serializers.ValidationError(

                'Title must contain at least 3 characters.'

            )

        return value


    class Meta:

        model = Task

        fields = [

            'id',

            'title',

            'description',

            'status',

            'priority',

            'deadline',

            'created_at',

        ]