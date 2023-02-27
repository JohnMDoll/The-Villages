from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from frontcapapi.models import Village

class Villages(ViewSet):

    def create(self, request):
        """posts a new village instance"""
        new_village = Village()
        new_village.user_id = request.data['userId']
        new_village.village_name = request.data['villageName']
        new_village.grid_length = request.data['gridLength']
        new_village.seed = request.data['seed']
        new_village.save()

        serialized = VillageSerializer(new_village, context={'request': request})

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

    def update(self, request, pk=None):
        """Updates a village db entry and returns updated data"""

        village = Village.objects.get(pk=pk)
        village.village_name = request.data['villageName']
        village.grid_length = request.data['gridLength']
        village.seed = request.data['seed']
        village.max_generations = request.data['maxGenerations']
        village.max_population = request.data['maxPopulation']
        village.save()

        serialized = VillageSerializer(village, context={'request': request})
        
        return Response(serialized.data, status=status.HTTP_204_NO_CONTENT)
    def destroy(self, request, pk=None):
        '''deletes a village'''
        village = Village.objects.get(pk=pk)
        village.delete()
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
        fields = ('id', 'userId', 'villageName', 'maxGenerations', 'maxPopulation', 'seed', 'gridLength')