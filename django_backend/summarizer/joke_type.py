from random import randrange

prompt = "Make a {joke_type} joke with the words {words} similar to these examples: \n" #user
prompt += "1. {example1} \n" #assistant
#user
prompt += "2. {example2} \n" #assistant
prompt += "Make a {joke_type} joke with the words {words} similar to these examples: \n" #user
prompt += "1. [Words: {words}] {starting_template}" #

class JokeType:
    base_prompt = prompt
    
    joke_type = ""
    joke_list = []

    #to make it more modular, pass a object with all of these values
    def __init__(self, joke_type, starting_template, joke_list) -> None:
        
        self.base_prompt.format(
            joke_type=joke_type, 
            starting_template=starting_template, 
            words="{words}",
            example1="{example1}",
            example2="{example2}"
        )

        self.joke_type = joke_type
        self.joke_list = joke_list
        pass

    def get_random_id(self):
        id1 = randrange(self.joke_list.__len__())
        return id1
    
    def two_shot_prompt(self, words):
        return self.base_prompt.format(
            words=words,
            example1=self.joke_list[self.get_random_id()],
            example2=self.joke_list[self.get_random_id()],
        )
    
    def no_shot_prompt(self, words):
        return "Use the words {words} in a {joke_type} joke".format(
            words=words,
            joke_type=self.joke_type
        )


    
    #def rank_examples(self, list):
    #ranking feature
        #maybe sorts jokes by ids in array
    #add jokes based on random id from jokes_list
