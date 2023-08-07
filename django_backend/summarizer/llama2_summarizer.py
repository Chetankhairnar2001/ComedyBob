import time
from transformers import AutoTokenizer
import transformers
import torch

from joke_styles.knock_knock import KnockKnock



# class Llama:
    
#     model = "meta-llama/Llama-2-7b-chat-hf"
#     tokenizer = AutoTokenizer.from_pretrained(model)
#     pipeline = transformers.pipeline(
#         "text-generation",
#         model=model,
#         torch_dtype=torch.float16,
#         device_map="auto",
#         #device=0,
#     )

#     def generate(self, text):
#         return self.pipeline(
#             text,
#             do_sample=True,
#             top_k=10,
#             num_return_sequences=1,
#             eos_token_id=self.tokenizer.eos_token_id,
#             max_length=200,
#         )

# from huggingface_hub import HfApi

# api = HfApi()

# api.upload_folder(
#     #folder_path="C:\\Users\\rokki\\.cache\\huggingface\\hub\\models--meta-llama--Llama-2-7b-chat-hf\\blobs",
#     folder_path="C:\\Users\\rokki\\.cache\\huggingface\\hub\\models--meta-llama--Llama-2-7b-chat-hf\\snapshots\\05d7cc02d0d1cfd518dc98a9a16be2708e4a9043",
#     path_in_repo = ".",
#     repo_id="vpalmerio/llama2-7b-chat-joke",
#     repo_type="model",
#     create_pr=1
# )


# test = Llama()

# start = time.time()
# result = test.generate(
#     "Write a summary"
# )
# print("Round 1: {x} seconds".format(x=time.time()-start))


# this = KnockKnock()
# prompt = this.two_shot_prompt(words='cheese')
# prompt2 = this.two_shot_prompt(words='cheese')
# prompt3 = this.two_shot_prompt(words='cheese')
# prompt4 = this.two_shot_prompt(words='cheese')
# start=time.time()
# result2 = test.generate(
#     [prompt, prompt2, prompt3, prompt4]
# )
# print("Round 2: {x} seconds".format(x=time.time()-start))

# print(result)
# print(result2)






# Does not have an api on hugging face :,(
#-------------------------------------------------------
API_URL = "https://api-inference.huggingface.co/models/vpalmerio/llama2-7b-chat-joke"
headers = {"Authorization": "Bearer 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"}

import requests

def query2(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query2({
    
    "inputs": f"the symptoms of bob disease is",
    })

print(output)