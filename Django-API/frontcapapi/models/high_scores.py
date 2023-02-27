from django.db import models

class HighScore(models.Model):
    village_id = models.ForeignKey('Village', on_delete=models.CASCADE)