from django.db import models

class HighScore(models.Model):
    village = models.ForeignKey('Village', on_delete=models.CASCADE)