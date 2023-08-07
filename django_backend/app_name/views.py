from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Text

from summarizer.summarizer import * 

# says that this function can do handle POST requests
@api_view(["POST"])
def summarize_view(request):
	
	# handle data inputs
	if request.method == "POST":
		
		# get the data and provide No value if not given
		text = request.data.get("text", None)
		type = request.data.get("type", None)
		
		# if type or text == None:
		# 	print(type, text)
		# 	return Response("Invalid data", status=200)

		# add it to the database and save
		new_addition = Text(text=text)
		new_addition.save()

		# pull the text and summarize it
		# try:
		# 	summary = summarize(new_addition.text, type)
		# except:
		# 	return Response("Failed", status=200)
		
		summary = summarize(new_addition.text, type)

		#openai.APIError.user_message
		
		#Catch and then return something else
		
		# return answer & status 200 (meaning everything worked!) 
		return Response(summary, status=200)
		
#put ranking stuff here