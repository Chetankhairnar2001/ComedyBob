import json
from django.shortcuts import redirect, render
from gtts import gTTS
from io import BytesIO
import pygame

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import UserData

from summarizer.summarizer import * 

from django.contrib.auth import login, logout, authenticate
from django.utils import timezone

from django.contrib.auth.models import User

TTS_ACTIVATED = False

@api_view(["POST"])
def registration2(request):
	username = request.data.get("username", None)
	password = request.data.get("password", None)
    
	# if username or password == None:
	# 	print(username, password)
	# 	return Response("Invalid data", status=200)
	try:
		user = User.objects.create_user(username=username, password=password)
	except:
		return Response(data="Try a different username", status=409)
        
	
	if user is not None:
		user.save()

		new_addition = UserData(username=username)
		new_addition.saved_joke_list = json.dumps([])
		new_addition.save()

		user = authenticate(request, username=username, password=password)
		
		login(request, user)
 
		return Response(status=200)
	else:
		return Response(data="Invalid login",status=401)

@api_view(["POST"])
def sign_in2(request):
	# try:
	# 	logout(request)
	# except:
	# 	print("Not logged in")
		
	username = request.data.get('username', None)
	password = request.data.get('password', None)
	user = authenticate(request, username=username, password=password)
	if user is not None:
		login(request, user)
		return Response(data="", status=200)
	else:
		return Response(data="Invalid login",status=406)


# Sign out controller method.
@api_view(["GET"])
def sign_out(request):
	if not request.user.is_authenticated:
		return Response(data="Please log in", status=400)
    # Log out the user using the logout method that comes with the Django auth coolness, which will delete the user's login session.
	logout(request)
	return Response(data="Logged out",status=200)


# says that this function can do handle POST requests
@api_view(["POST"])
def summarize_view(request):
	if not request.user.is_authenticated:
		return Response(data="Please log in!", status=403)
	# handle data inputs
	if request.method == "POST":
		
		# get the data and provide No value if not given
		text = request.data.get("text", None)
		type = request.data.get("type", None)
		
		# if type or text == None:
		# 	print(type, text)
		# 	return Response("Invalid data", status=200)
		
		# pull the text and summarize it
		# try:
		# 	summary = summarize(new_addition.text, type)
		# except:
		# 	return Response("Failed", status=200)
		
		summary = summarize(text, type)
		
		if TTS_ACTIVATED:
			summary_len = len(summary); time=0
			if summary_len<=60:
				time = 4500
			elif summary_len<=110:
				time = 6500
			else:
				time = 9500
			pygame.init()
			text = summary
			# Create a gTTS object
			tts = gTTS(text, lang='en')
			# Save the speech to a BytesIO object
			audio_stream = BytesIO()
			tts.write_to_fp(audio_stream)
			# Play the speech using pygame
			audio_stream.seek(0)
			pygame.mixer.init()
			pygame.mixer.music.load(audio_stream)
			pygame.mixer.music.play()
			pygame.time.delay(time)  # Delay for 5 seconds
			pygame.event.wait()

		#save joke to database
		new_addition = UserData.objects.get(username=request.user.username)
		decoded_list = json.loads(new_addition.saved_joke_list)
		decoded_list.append(summary)
		new_addition.saved_joke_list = json.dumps(decoded_list)
		new_addition.save()

		# return answer & status 200 (meaning everything worked!) 
		return Response(summary, status=200)

@api_view(["GET"])
def get_saved_jokes(request):
	if not request.user.is_authenticated:
		return Response(data="Please log in", status=400)
	new_addition = UserData.objects.get(username=request.user.username)
	decoded_list = json.loads(new_addition.saved_joke_list)
	return Response(data=decoded_list, status=200)


#put ranking stuff here