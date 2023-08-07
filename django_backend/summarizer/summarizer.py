# import library
import os
import openai

# configure openai to your account 
from dotenv import load_dotenv, find_dotenv

#from summarizer.llama2_summarizer import Llama
from summarizer.joke_type import JokeType
# finds and loads the .env file
load_dotenv(find_dotenv())

# call the variable from the loaded file
openai.api_key = os.environ.get("openai_api_key")

# {
# 	'role': 'user',
# 	'content': ''
# }
# {
# 	'role': 'assistant'
# 	'content': 
# }

knockknock = JokeType(
    joke_type="knock knock",
	starting_template="Knock Knock. Who's there?",
	joke_list= [
		"[Words: Nobel] Knock, Knock. Who’s there? Nobel. Nobel who? Nobel…that’s why I knocked!",
		"[Words: Tank] Knock, Knock. Who’s there? Tank. Tank who? You’re welcome.",
		"[Words: Luke, Peep hole] Knock, Knock. Who’s there? Luke. Luke who? Luke through the peep hole and find out.",
		"[Words: Figs] Knock, Knock. Who’s there? Figs. Figs who? Figs the doorbell, it’s not working!",
	]
)

def summarize(text, type):
	
	# create prompt
	# prompt = "Write a concise summary of the following content: \n"
	# prompt += text
	
	# ping model and generate a response

	if type == "Knock Knock":
		#prompt = knockknock.two_shot_prompt(text)
		prompt = knockknock.no_shot_prompt(text)
	elif type == "Completion":
		prompt = "Complete this joke: " + text
	

	completion = openai.ChatCompletion.create(
		model="gpt-3.5-turbo-16k",
		messages = [{'role':'user','content': prompt}],
	)

	#print(completion.choices[0].message.content)
	
	#clean up response to just the actual String value and return 
	#answer = response["choices"][0]["text"].strip()
	return completion.choices[0].message.content 



# def make_joke_llama(text):
# 	#prompt = "Write a concise summary of the following content: \n"
# 	prompt = "Make a {Y} joke with the words {x} similar to these examples: \n"
# 	example1 = "1. [Words: ] {Joke} \n"
# 	example2 = "2. [Words: ] {Joke} \n"
# 	prompt += example1 
# 	prompt += example2
# 	prompt += "Make a {Y} joke with the words {x} similar to these examples: \n"
# 	prompt += "1. [Words: {x}] {Starting_template}"

	
# 	prompt += text

# 	sequences = model.generate(text)

# 	for seq in sequences:
# 		print(f"Result: {seq['generated_text']}")

########################################################
# you can tinker even further with model settings.     #
# read about your options here: https://platform.openai.com/docs/api-reference/completions/create                        
# #
########################################################
