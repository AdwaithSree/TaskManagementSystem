from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):

    STATUS_CHOICES = [

        ('Pending', 'Pending'),

        ('In Progress', 'In Progress'),

        ('Completed', 'Completed'),

    ]


    PRIORITY_CHOICES = [

        ('Low', 'Low'),

        ('Medium', 'Medium'),

        ('High', 'High'),

    ]


    title = models.CharField(max_length=255)

    description = models.TextField()

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    priority = models.CharField(
        max_length=50,
        choices=PRIORITY_CHOICES,
        default='Medium'
    )

    deadline = models.DateField()

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return self.title