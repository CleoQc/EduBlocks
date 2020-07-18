import sys
import requests

def checkApiKey(key):
  if key == "CHANGE THIS TO YOUR PROJECT API KEY":
    print ("You need to enter your secret project API key into this sample.")
    print("Replace the string on line 6 with your key.")
    sys.exit()

def trainModel(key):
  checkApiKey(key)
  
  url = ("https://machinelearningforkids.co.uk/api/scratch/" + 
         key + 
         "/models")

  response = requests.post(url)

  if response.ok == False:
    print (response.json())
    

def checkModel(key):
  checkApiKey(key)
  
  url = ("https://machinelearningforkids.co.uk/api/scratch/" + 
         key + 
         "/status")

  response = requests.get(url)

  if response.ok:
    responseData = response.json()

    status = {
      2 : "ready to use",
      1 : "training is in progress",
      0 : "problem"
    }

    return { 
      "status" : status[responseData["status"]], 
      "msg" : responseData["msg"] 
    }
  else:
    print (response.json())
