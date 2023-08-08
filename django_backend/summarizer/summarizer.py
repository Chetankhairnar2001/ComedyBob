# import library
import os
import openai

# configure openai to your account 
from dotenv import load_dotenv, find_dotenv

#from summarizer.llama2_summarizer import Llama
from summarizer.joke_type import JokeType, completion_prompt
from summarizer.joke_examples import q_and_a_examples
# finds and loads the .env file
load_dotenv(find_dotenv())

# call the variable from the loaded file
openai.api_key = os.environ.get("openai_api_key")


knockknock = JokeType(
    joke_type="knock knock",
	unstructured_joke_list= [
		["Nobel", "Knock, Knock. Who’s there? Nobel. Nobel who? Nobel…that’s why I knocked!"],
		["Tank", "Knock, Knock. Who’s there? Tank. Tank who? You’re welcome."],
		["Luke, Peep hole", "Knock, Knock. Who’s there? Luke. Luke who? Luke through the peep hole and find out."],
		["Figs", "Knock, Knock. Who’s there? Figs. Figs who? Figs the doorbell, it’s not working!"],
	]
)

q_and_a = JokeType(
    joke_type="Q and A",
	unstructured_joke_list= q_and_a_examples
)

#API Request Example
# {
# "text": "bunny", 
# "type": "Knock Knock"
# }
def summarize(text, type):

	if type == "Knock Knock":
		prompt = knockknock.n_shot_prompt(text, amount_of_examples=0)
	elif type == "Q and A":
		prompt = q_and_a.n_shot_prompt(text, amount_of_examples=2)
	elif type == "Completion":
		prompt = completion_prompt(text)

	completion = openai.ChatCompletion.create(
		model="gpt-3.5-turbo",
		messages = prompt,
	)

	return completion.choices[0].message.content 
