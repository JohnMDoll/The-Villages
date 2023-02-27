from django.db import models

class Village(models.Model):
    max_generations = models.IntegerField()
    max_population = models.IntegerField()
    village_name = models.CharField()
    gridLength = models.IntegerField()
    seed = models.CharField()
    user_id = models.ForeignKey('User', on_delete=models.CASCADE)
