from django.db import models
from django.contrib.auth.models import User

class Village(models.Model):
    max_generations = models.IntegerField(null=True)
    max_population = models.IntegerField(null=True)
    village_name = models.CharField(max_length=55, default="Unloved Village")
    grid_length = models.IntegerField()
    seed = models.JSONField(max_length=75000, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
