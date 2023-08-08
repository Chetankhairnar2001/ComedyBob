from django.db import models

# Create your models here.

class UserData(models.Model):
	username=models.CharField(max_length = 500, blank=False)
	saved_joke_list = models.TextField(null=True) # JSON-serialized version of list
	time_sent = models.DateTimeField(auto_now_add = True) 
	