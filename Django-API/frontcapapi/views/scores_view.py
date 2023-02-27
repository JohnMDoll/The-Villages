from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from frontcapapi.models import Village, HighScore

class HighScores(ViewSet):

    def create(self, request):
        """posts a new village instance"""
        new_score = HighScore()
        new_score.village_id = request.data['villageId']
        new_score.save()

        serialized = VillageSerializer(new_score, context={'request': request})

        return Response(serialized.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        '''retrieves a village'''
        village = Village.objects.get(pk=pk)

        serialized = VillageSerializer(village, context={'request': request})

        return Response(serialized.data)

    def list(self, request):
        '''returns list of villages'''
        if 'userId' in self.request.query_params:
            villages = Village.objects.filter(user_id=request.query_params['userId'])
        else:
            villages = Village.objects.all()

        serialized = VillageSerializer(villages, many=True, context={'request': request})

        return Response(serialized.data)

    def destroy(self, request, pk=None):
        '''deletes a high score'''
        score = HighScore.objects.get(pk=pk)
        score.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)

class VillageSerializer(serializers.ModelSerializer):
    """JSON serializer for villages"""
    userId = serializers.IntegerField(source='user_id')
    villageName = serializers.CharField(source='village_name')
    maxGenerations = serializers.IntegerField(source='max_generations')
    maxPopulation = serializers.IntegerField(source='max_population')
    gridLength = serializers.IntegerField(source='grid_length')

    class Meta:
        model = Village
        fields = ('id', 'userId', 'villageName', 'maxGenerations', 'maxPopulation', 'gridLength')