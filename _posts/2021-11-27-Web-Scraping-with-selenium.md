---
title: Web Scraping With Selenium
categories:
- Scraping
- Selenium
excerpt: |
  Simple example to scrape NBA player's salary
feature_text: |
  ## Simple example to scrape NBA player's salary
feature_image: "https://picsum.photos/2560/600?image=733"
image: "https://picsum.photos/2560/600?image=733"
---

## Introduction
Web scraping refers to extracting the content of a website programmatically. Specifically, developers create bots to get the HTML code of a website, parse the code and export the result to an external data source.

Developers do it for different purposes. Search Engines scrape data from websites and further index it so that we can find information much easily. However, there are quite a lot of bad bots on the internet ([25.6% of all website traffic comes from bad bots](https://www.imperva.com/blog/bad-bot-report-2021-the-pandemic-of-the-internet/)), these bad bots may try to steal your content, e.g. 
[Data Leak in Alibaba's Taobao due to web scraping](https://www.wsj.com/articles/alibaba-falls-victim-to-chinese-web-crawler-in-large-data-leak-11623774850).

## Web Scraping on NBA players' information
Today, web scraping becomes much easier due to technology advance, which we will illustrate it by a simple example, how to scrape NBA players' information, e.g. Height, Birthdate, salary.

Here's the main page of NBA players' basic information: [https://hoopshype.com/salaries/players](https://hoopshype.com/salaries/players). 

We can navigate to another web page that contains each player's basic information from this page.

{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/nba-players-information-overview.png" alt="NBA Players Information Overview" caption="NBA Players Information Overview"%}

{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/stephen-curry-basic-information.png" alt="Stephen Curry's basic information" caption="Stephen Curry's basic information"%}


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
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/selenium-driver-zip-file.png" alt="Selenium Drive zip file" caption="Selenium Drive zip file"%}
Unzip the folder. Optionally, you can move the folder to another directory
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/selenium-driver-exe.png" alt="Selenium Drive Executable file" caption="Selenium Drive Executable file"%}
Type "Environment Variables" in start menu & select "Edit the system environment variables"
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/search-environment-variables.png" alt="Search Environment Variables" caption="Search Environment Variables"%}
Update "PATH" variable to include the folder path which contains the driver program
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/update-path-environment-variable.png" alt="Update 'Path' Environment Variable" caption="Update 'Path' Environment Variable"%}

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
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/browser-launche-by-selenium.png" alt="Browser launched by Selenium" caption="Browser launched by Selenium"%}

### Navigate to NBA player's basic information page
In order to get each player's basic information, we need to navigate to the corresponding page & extract the data. The links of these pages are already in a table of the main page.
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/nba-players-basic-informaion-link.png" alt="NBA players basic information link" caption="NBA players basic information link"%}
To get the links in this table, we can find the corresponding HTML elements. We can use the below method to find the HTML element of those links of NBA players' basic information page.





Blog: [https://joeho.xyz](https://joeho.xyz)

LinkedIn: [https://www.linkedin.com/in/ho-cho-tai-0260758a](https://www.linkedin.com/in/ho-cho-tai-0260758a)