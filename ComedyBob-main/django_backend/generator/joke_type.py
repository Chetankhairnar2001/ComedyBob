from random import randrange

class ExampleJoke:
    joke = ""
    words = ""
    joke_type = ""

    def __init__(self, joke, joke_type, words):
        self.joke = joke
        self.words = words
        self.joke_type = joke_type

    def get_prompt(self):
        return [
            {'role':'user', 'content':'Make a {joke_type} joke with the words {words}'.format(joke_type=self.joke_type, words=self.words)},
            {'role':'assistant', 'content':self.joke}
        ]

class JokeType:
    base_prompt = {}

    no_shot_base_prompt = {}
    
    joke_type = ""
    example_joke_list = []

    def __init__(self, joke_type, unstructured_joke_list):
        
        self.base_prompt = {
            'role':'system', 
            'content':'You are an assitant that makes funny and sassy jokes. The user will ask you to make a {joke_type} joke out of a word or set of words, and you will respond with a joke using that word or words'.format(joke_type=joke_type)
        }
        

        self.joke_type = joke_type

        example_jokes = []

        for joke in unstructured_joke_list:
            example_jokes.append(
                ExampleJoke(joke_type=joke_type, joke=joke[1], words = joke[0])
            )

        self.example_joke_list = example_jokes
        

    def get_random_id(self):
        id1 = randrange(self.example_joke_list.__len__())
        return id1
    
    def n_shot_prompt(self, words, amount_of_examples):
        prompt = [
            self.base_prompt
        ]
        joke_ids = []
        for _ in range(amount_of_examples):
            id = self.get_random_id()
            while id in joke_ids:
                id = self.get_random_id()
            joke_ids.append(id)
            prompt.extend(
                self.example_joke_list[id].get_prompt()
            )
        prompt.append(
            {'role':'user', 'content':'Make a {joke_type} joke with the words {words}'.format(joke_type=self.joke_type, words=words)}
        )
        
        joke_ids_string = ''.join(str(e) + "," for e in joke_ids)
        print(joke_ids_string)
        return prompt, joke_ids_string


    
    #def rank_examples(self, list):
    #ranking feature
        #maybe sorts jokes by ids in array
    #add jokes based on random id from jokes_list

def completion_prompt(incomplete_joke):
    prompt = [
        {
            'role':'system', 
            'content':'You are an assitant that makes funny and sassy jokes. The user will give an incomplete joke, and you will complete it.'
        }
    ]
    prompt.append(
        {
            'role': 'user',
            'content':incomplete_joke
        }
    )
    return prompt
