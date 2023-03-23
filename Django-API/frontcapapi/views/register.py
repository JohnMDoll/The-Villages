"""Register user"""
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.decorators import api_view, renderer_classes
import json
from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authtoken.models import Token


@csrf_exempt
def login_user(request):
    '''Handles the authentication of a user

    Method arguments:
        request -- The full HTTP request object
    '''

    # If the request is a HTTP POST, try to pull out the relevant information.
    if request.method == 'GET':

        # Use the built-in authenticate method to verify
        name = request.GET['userName']
        pass_word = request.GET['password']
        authenticated_user = authenticate(username=name, password=pass_word)

        # If authentication was successful, respond with their token
        if authenticated_user is not None:
            token = Token.objects.get(user=authenticated_user)
            data = json.dumps([{"valid": True, "token": token.key, "id": authenticated_user.id, "userName": authenticated_user.username}])
            return HttpResponse(data, content_type='application/json')

        else:
            # Bad login details were provided. So we can't log the user in.
            data = json.dumps({"valid": False})
            return HttpResponse(data, content_type='application/json')

    return HttpResponseNotAllowed(permitted_methods=['GET'])

@csrf_exempt
@api_view(['GET'])
def get_users(request):
    """gets list of users"""
    class VillageUserSerializer(serializers.ModelSerializer):
        userName = serializers.CharField(source='username')
        class Meta:
            model = User
            fields = ('id', "userName")
    users = User.objects.all()
    serialized = VillageUserSerializer(users, many=True)
    return Response(serialized.data)

@csrf_exempt
def register_user(request):
    '''Handles the creation of a new user for authentication

    Method arguments:
        request -- The full HTTP request object
    '''
    if 'userName' in request.GET:
        response = login_user(request)
        return response
    elif request.method == 'GET':
        response = get_users(request)
        return response

    # Load the JSON string of the request body into a dict
    req_body = json.loads(request.body.decode())

    # Create a new user by invoking the `create_user` helper method
    # on Django's built-in User model
    new_user = User.objects.create_user(
        username=req_body['userName'],
        password=req_body['password'],
    )

    # Commit the user to the database by saving it
    new_user.save()

    # Use the REST Framework's token generator on the new user account
    token = Token.objects.create(user=new_user)

    # Return the token to the client
    data = json.dumps({"token": token.key, "id": new_user.id, "userName": req_body['userName']})
    return HttpResponse(data, content_type='application/json', status=status.HTTP_201_CREATED)

