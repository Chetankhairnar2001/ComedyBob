

prompt = "Make a {joke_type} joke with the words {words} similar to these examples: \n"
prompt += "1. {example1} \n"
prompt += "2. {example2} \n"
prompt += "Make a {joke_type} joke with the words {words} similar to these examples: \n"
prompt += "1. [Words: {words}] {starting_template}"

class JokeTemplate:
    base_template = prompt