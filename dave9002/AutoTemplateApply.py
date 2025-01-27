import os
import json
import shutil
import datetime
# n. Search local directory for .JSON files that start with "ATA" and put the locations into a list.
# n. Read each JSON file to make sure it is properly formatted. Remove from list if not.
# For each JSON file...
# n. Get the Output file, main template, and Main repeat from the header 
# n. Make sure the MainTemplate file exists and store its contents, if it does not. Back out and move onto the next JSON file in the list
# n. If the output file exists create a copy as a backup and delete the original.
# For each detail...
# n. Get the keys
# Create an element from the main repeat that replaces matching elements with the value from the keys. 
# Put the created elements into the main template and export as output
# Export log file.

prefix = "ATA"
OUTPUT = "output"
MAINTEMPLATE = "maintemplate"
MAINREPEAT = "mainrepeat"
ATAHERE = "{ATAHERE}"
DoBackup = False

logoutput = "" #Outputs to ATA 
MainTemplate = "" #From each header
ATAJSONS = []


#Gets the raw text within a file
def GetFileAsString (locus):
    toSend = ""
    leFile = open(locus)
    for ln in leFile:
        toSend = toSend + ln 
    leFile.close()

    return toSend

def ValidateATAJson (PutJSONHere):
    if type(PutJSONHere) != list:
        return False #Is not a list
    
    if (len(PutJSONHere) == 0):
        return False #List is empty
    
    if "output" not in PutJSONHere[0]:
        return False #Header does not have "output"
    
    if "maintemplate" not in PutJSONHere[0]:
        return False #Header does not have "maintemplate"
    
    if "mainrepeat" not in PutJSONHere[0]:
        return False #Header does not have "mainrepeat"
    
    return True

#Processes lists in the main JSON into sub-repeats
def JSONToTemplate (PutJSONHere):
    leList = PutJSONHere
    mainTemplate = leList.pop(0)
    toSend = ""

    for det in leList:
        subTemplate = mainTemplate
        for key in det.keys():
            subTemplate = subTemplate.replace("{"+key+"}",det[key])
        toSend = toSend + subTemplate
    
    return toSend


# n. Search local directory for .JSON files that start with "ATA" and put the locations into a list.

logoutput = logoutput + "Starting AutoTemplateApply\n============================\n\n"

logoutput = logoutput + "Locating JSONS for processing\n\n"

rawPath = os.walk('.')

#https://www.geeksforgeeks.org/os-walk-python/
#https://stackoverflow.com/questions/541390/extracting-extension-from-filename-in-python/
for path,folders,files in rawPath:
    #print (path)
    #print (folders)
    #print (files)
    for file in files:
        if os.path.splitext(file)[1] == '.json' and file.find(prefix) == 0:
            
            ATAPath = (path + "\\" + file)
            logoutput = logoutput + "Found: " + ATAPath + '\n'
            canadd = True
            # n. Read each JSON file to make sure it is properly formatted. Remove from list if not.
            ATAContents = GetFileAsString(ATAPath)
            ATAContentsJson = {}
            try:
                ATAContentsJson = json.loads(ATAContents)
            except:
                logoutput = logoutput + "NOT VALID JSON\n"
                canadd = False

            if ValidateATAJson(ATAContentsJson):
                logoutput = logoutput + "Added for processing\n"
                ATAJSONS.append(ATAPath)
            else:
                logoutput = logoutput + "NOT VALID\nShould\n-Be a list\n-First element should have an \"output\", \"maintemplate\", \"mainrepeat\" field."



logoutput = logoutput + "\nProcessing JSONS\n"

# For each JSON file...
for lepath in ATAJSONS:
    rawlist = json.loads(GetFileAsString(lepath))
    basepath = os.path.dirname(lepath)
    leOutput = basepath + "\\" + rawlist[0][OUTPUT]
    leMainTemplate = basepath + "\\" + rawlist[0][MAINTEMPLATE]
    leMainRepeat = rawlist[0][MAINREPEAT]

    if os.path.exists(leMainTemplate) == False:
        logoutput = logoutput + "ERROR: "+ leMainTemplate +" does not exist!\n Skipping."
        continue
    
    leMainTemplate = GetFileAsString(leMainTemplate)

    
    rawlist.pop(0) #Off with the header!
    toInsert = "" # What will go into the main template

    for elem in rawlist:
        toInsertSub = leMainRepeat
        

        for key in elem.keys():
            if (type(elem[key]) == list):
                toInsertSub = toInsertSub.replace("{"+key+"}",JSONToTemplate(elem[key]))
            else:
                toInsertSub = toInsertSub.replace("{"+key+"}",elem[key])
        
        toInsert = toInsert + toInsertSub
    
    leMainTemplate = leMainTemplate.replace(ATAHERE,toInsert)

    #Check and see if the file exists before backing up and overwriting it
    if os.path.exists(leOutput) and DoBackup == True:
        #Creating backup
        logoutput = logoutput + "Creating backup\n"
        backupPath = os.path.splitext(leOutput)[0] + datetime.datetime.now().strftime("%Y_%m_%d_%H_%M_%S_%f") +  os.path.splitext(leOutput)[1] 
        #https://stackoverflow.com/questions/123198/how-to-copy-files
        shutil.copyfile(leOutput,backupPath)
    #https://www.pythonforbeginners.com/basics/overwrite-a-file-in-python

    logoutput = logoutput + "Writing File\n"
    ActualOutput = open(leOutput,"w")
    ActualOutput.write(leMainTemplate)
    ActualOutput.close()


print(logoutput)