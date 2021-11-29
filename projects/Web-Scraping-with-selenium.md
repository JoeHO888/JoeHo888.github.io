---
title: Web Scraping With Selenium
excerpt: |
  Simple example to scrape NBA player's salary
feature_text: |
  ## Simple example to scrape NBA player's salary
feature_image: "https://picsum.photos/2560/600?image=733"
image: "https://picsum.photos/2560/600?image=733"
---

_Project_ _sponsored_ _by_ [Geetest](https://www.geetest.com/en/)

## Introduction
Web scraping refers to extracting the content of a website programmatically. Specifically, developers create bots to get the HTML code of a website, parse the code and export the result to an external data source.

Developers do it for different purposes. Search Engines scrape data from websites and further index it so that we can find information much easily. However, there are quite a lot of bad bots on the internet ([25.6% of all website traffic comes from bad bots](https://www.imperva.com/blog/bad-bot-report-2021-the-pandemic-of-the-internet/)), these bad bots may try to steal your content, e.g. 
[Data Leak in Alibaba's Taobao due to web scraping](https://www.wsj.com/articles/alibaba-falls-victim-to-chinese-web-crawler-in-large-data-leak-11623774850).

## Web Scraping on NBA players' information
Today, web scraping becomes much easier due to technology advance, which we will illustrate it by a simple example, how to scrape NBA players' information, e.g. Height, Birthdate, salary.

Here's the main page of NBA players' basic information: [https://hoopshype.com/salaries/players](https://hoopshype.com/salaries/players). 

We can navigate to another web page that contains each player's basic information from this page.

{% include figure.html image="/images/Web-Scraping-with-selenium/nba-players-information-overview.png" alt="NBA Players Information Overview" caption="NBA Players Information Overview"%}

{% include figure.html image="/images/Web-Scraping-with-selenium/stephen-curry-basic-information.png" alt="Stephen Curry's basic information" caption="Stephen Curry's basic information"%}


### Prerequisite
Basic Python & HTML knowledge is required.

We will use  **Python** for web scraping, these are Python modules that we will use
1. [Selenium](https://selenium-python.readthedocs.io/)
2. [Beautiful Soup](https://beautiful-soup-4.readthedocs.io/en/latest/)
3. [Pandas](https://pandas.pydata.org/)


### Selenium Driver Installation

To let Selenium module functions, we need to install Selenium driver. The driver depends on the operating system of your machine and the version of your web browser.

We will illustrate the installation steps for Windows,  you may refer to [https://selenium-python.readthedocs.io/installation.html#drivers](https://selenium-python.readthedocs.io/installation.html#drivers) for more detail.

Download the zip file containing the chromedriver.exe
{% include figure.html image="/images/Web-Scraping-with-selenium/selenium-driver-zip-file.png" alt="Selenium Drive zip file" caption="Selenium Drive zip file"%}
Unzip the folder. Optionally, you can move the folder to another directory
{% include figure.html image="/images/Web-Scraping-with-selenium/selenium-driver-exe.png" alt="Selenium Drive Executable file" caption="Selenium Drive Executable file"%}
Type "Environment Variables" in start menu & select "Edit the system environment variables"
{% include figure.html image="/images/Web-Scraping-with-selenium/search-environment-variables.png" alt="Search Environment Variables" caption="Search Environment Variables"%}
Update "PATH" variable to include the folder path which contains the driver program
{% include figure.html image="/images/Web-Scraping-with-selenium/update-path-environment-variable.png" alt="Update 'Path' Environment Variable" caption="Update 'Path' Environment Variable"%}

### Get HTML code of the website
First of all, let us try to use Selenium to launch a new browser & get the source code of NBA players' salary data source.
``` python
from selenium import webdriver

driver = webdriver.Chrome() # Launch Chrome browser

driver.get("https://hoopshype.com/salaries/players") # Navigate to our main page
html = driver.page_source # Get the source code
print(html)
```
You should get the HTML code as below.
``` html
<html lang="en-US" class="js">
	...
	<head>
	<meta name="description" content="Hoopshype salaries of all NBA players" />
	</head>
	...
	<body class="salaries page-template-default infinite-scroll neverending flip-cards-active">
	...
	</body>
</html>
```
On the other hand, you should see a new browser is launched. 
{% include figure.html image="/images/Web-Scraping-with-selenium/browser-launch-by-selenium.png" alt="Browser launched by Selenium" caption="Browser launched by Selenium"%}

### Navigate to NBA player's basic information page
In order to get each player's basic information, we need to navigate to the corresponding page & extract the data. The links of these pages are already in a table of the main page.
{% include figure.html image="/images/Web-Scraping-with-selenium/nba-players-basic-informaion-link.png" alt="NBA players basic information link" caption="NBA players basic information link"%}
To get the links in this table, we can find the corresponding HTML elements. We can use the below method to find the HTML element of those links of NBA players' basic information page.
Right click one of the links.
{% include figure.html image="/images/Web-Scraping-with-selenium/right-click-a-nba-player-basic-information-link.png" alt="Right Click a NBA player's basic information link" caption="Right Click a NBA player's basic information link"%}
Select "Inspect".
{% include figure.html image="/images/Web-Scraping-with-selenium/inspect-a-nba-player-basic-information-link-html-element.png" alt="Inspect a NBA player basic information link HTML element" caption="Inspect a NBA player basic information link HTML element"%}
Developer tool should appear & the corresponding HTML element should be highlighted.
{% include figure.html image="/images/Web-Scraping-with-selenium/nba-player-link-html-element.png" alt="NBA player link HTML element" caption="NBA player link HTML element"%}
HTML elements for other players are similar to this one.

Next, we use Beautiful Soup to extract the links of basic information page for all players.
``` python
from bs4 import BeautifulSoup

...
html = driver.page_source # Get the source code
soup = BeautifulSoup(html, 'html.parser') # Represent the source code & Allow us to do searching

# Locate the salary table & extract all links inside it
salary_table = soup.find("table", {"class": ("hh-salaries-ranking-table", 
                                             "hh-salaries-table-sortable",
                                             "responsive")}
                        )
# players_basic_information_links store all links
players_basic_information_links  = [
    a_tag_element.get("href") 
    for a_tag_element in salary_table.findChildren("a" , recursive=True)
]
```
There are numerous ways to query the HTML code with BeautifulSoup. Here, we locate the salary table by "table tag" & its classes, then extract all links inside it.
{% include figure.html image="/images/Web-Scraping-with-selenium/extract-links-inside-table.png" alt="Extract links inside table" caption="Extract links inside table"%}

### Extract basic information
After getting the link to each player's basic information page, we will extract the basic information for each user. Most of those pieces of information are text and non-clickable, we need to locate its element by highlighting them and right clicking as below.
{% include figure.html image="/images/Web-Scraping-with-selenium/inspect-stephen-curry-basic-information.png" alt="'Inspect' Stephen Curry Basic Information" caption="'Inspect' Stephen Curry Basic Information"%}

Once again, you can use BeautifulSoup to extract the elements of those pieces of information by performing certain queries.
``` python
from bs4 import BeautifulSoup
from selenium import webdriver

basic_information_page_link "https://hoopshype.com/player/stephen-curry/salary/"
driver.get(basic_information_page_link ) # Navigate to basic information page
basic_information_html = driver.page_source # Get the source code
soup = BeautifulSoup(basic_information_html, 'html.parser') # Represent the source code & Allow us to do searching

# Extract Information
player_name = soup.find("div", {"class": "player-fullname"}).text.strip() # Get Name
player_jersey = soup.find("div", {"class": "player-jersey"}).text.strip() # Get Jersey
player_team = soup.find("div", {"class": "player-team"}).text.strip() # Get Team

# Get all elements with player-bio-text-line-value
# Match each element to corresponding biography information
bio_text_values = soup.find_all("span", {"class": "player-bio-text-line-value"})
player_position = bio_text_values[0].text.strip()
player_birthdate = bio_text_values[1].text.strip()
player_height = bio_text_values[2].text.strip()
player_weight = bio_text_values[3].text.strip()
player_salary = bio_text_values[4].text.strip()


print(player_name + "\n" + 
      player_jersey + "\n" + 
      player_team + "\n" + 
      player_position + "\n" + 
      player_birthdate + "\n" + 
      player_height + "\n" + 
      player_weight + "\n" + 
      player_salary)
```
Unfortunately, there is no way to identify position, birth date, height, weight and salary, as all of them share common attributes. Therefore, we get all relevant elements and match them one by one.
The output should look like this
```
Stephen Curry
#30
Golden State Warriors
G
03/14/88
6-3 / 1.91
185 lbs. / 83.9 kg.
$45,780,966
```

### Repeat the steps for each player
After being able to extract the information from a player, we just need to repeat the whole process for each player and store the information
``` python
from bs4 import BeautifulSoup
from selenium import webdriver
import time

driver = webdriver.Chrome() # Launch Chrome browser

driver.get("https://hoopshype.com/salaries/players") # Navigate to our main page
...
players_basic_information_links  = [
    a_tag_element.get("href") 
    for a_tag_element in salary_table.findChildren("a" , recursive=True)
]

# Initiate arrays to store information
all_players_info = []


# Looping over all basic information page links
# for basic_information_page_link in players_basic_information_links:

#  We won't loop over all basic links in this example.
# Otherwise, we may consume too many resources from this website
for basic_information_page_link in players_basic_information_links[:2]:
	  driver.get(basic_information_page_link ) # Navigate to basic information page
		...

		# Extract Information
		player_name = soup.find("div", {"class": "player-fullname"}).text.strip() # Get Name
		player_jersey = soup.find("div", {"class": "player-jersey"}).text.strip() # Get Jersey
		...

		# Store information
		all_players_info.append([
        player_name, 
				player_jersey, 
				player_team, 
				player_position, 
				player_birthdate, 
				player_height, 
				player_weight, 
				player_salary
    ])
		# Pause 5 seconds before we get information for another player
		# Otherwise, we increase the load for their server significantly
		time.sleep(5)
```

### Export result to a csv file
We convert the data to a table-like format
``` python
import pandas as pd

...

# Create a dataframe, you may treat it as a table
df = pd.DataFrame(all_players_info, 
                  columns =[
                      "Name", 
                      "Jersey", 
                      "Team", 
                      "Position", 
                      "Birthdate", 
                      "Height", 
                      "Weight", 
                      "Salary"
                  ]
                 )
print(df)
```
You should see a table as below.
{% include figure.html image="/images/Web-Scraping-with-selenium/nba-players-information-pandas-table.png" alt="NBA players Information Pandas Table" caption="NBA players Information Pandas Table"%}
Finally, we export the information as a csv file
``` python
import pandas as pd

...

df.to_csv(".\players.csv",index=False)
```



## Conclusion
The above tutorial outlines how to scrape data from web pages with just three python modules. In fact, anyone who has basic knowledge of Python & HTML can learn web scraping quickly given that there are lots of mature tools. In other words, anybody can steal your web content easily if you have zero protection on your web content. Therefore, it becomes crucial to protect your content by adopting Cyber Security technologies.

These technologies can monitor your websites' traffic, verify the authenticity of incoming traffic & block the incoming traffic. For example, [Geetest's BotSonar](https://www.geetest.com/BotSonar), which is adopted by multinational companies, e.g. KFC & Nike, that technology monitors your website 24/7 and distinguishes the traffic between bad bots and human beings by their AI technology. On top of that, you can choose how do you handle those bad incoming traffic, e.g. blocking the bad incoming traffic or showing fake content to them. Besides, Geetest respects your data privacy, their products are GDPR compliant, which is a plus if you are from enterprise background.


## Source Code
Source code is available at [https://github.com/JoeHO888/How-does-web-scraping-become-simpler-and-how-to-prevent-it/blob/main/How%20does%20web%20scraping%20become%20simpler%20and%20how%20to%20prevent%20it%20-%20Source%20Code.ipynb](https://github.com/JoeHO888/How-does-web-scraping-become-simpler-and-how-to-prevent-it/blob/main/How%20does%20web%20scraping%20become%20simpler%20and%20how%20to%20prevent%20it%20-%20Source%20Code.ipynb)


Blog: [https://joeho.xyz](https://joeho.xyz)

LinkedIn: [https://www.linkedin.com/in/ho-cho-tai-0260758a](https://www.linkedin.com/in/ho-cho-tai-0260758a)