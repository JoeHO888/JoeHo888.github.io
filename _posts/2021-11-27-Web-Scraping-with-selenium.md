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

Developers do it for different purposes. Search Engines scrape data from websites and further index it so that we can find information much easily. However, there are quite a lot of bad bots on the internet ([https://www.imperva.com/blog/bad-bot-report-2021-the-pandemic-of-the-internet/](25.6% of all website traffic comes from bad bots)), these bad bots may try to steal your content, e.g. [https://www.wsj.com/articles/alibaba-falls-victim-to-chinese-web-crawler-in-large-data-leak-11623774850](Data Leak in Alibaba's Taobao due to web scraping).

## Web Scraping on NBA players' information
Today, web scraping becomes much easier due to technology advance, which we will illustrate it by a simple example, how to scrape NBA players' information, e.g. Height, Birthdate, salary.

Here's the main page of NBA players' basic information: [https://hoopshype.com/salaries/players](https://hoopshype.com/salaries/players). 

We can navigate to another web page that contains each player's basic information from this page.

{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/nba-players-information-overview.png" alt="NBA Players Information Overview" caption="NBA Players Information Overview"%}

{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/stephen-curry-basic-information.png" alt="Stephen Curry's basic information" caption="Stephen Curry's basic information"%}


## Prerequisite
Basic Python & HTML knowledge is required.

We will use  **Python** for web scraping, these are Python modules that we will use
1. [Selenium](https://selenium-python.readthedocs.io/)
2. [Beautiful Soup](https://beautiful-soup-4.readthedocs.io/en/latest/)
3. [Pandas](https://pandas.pydata.org/)


### Selenium Driver Installation

To let Selenium module functions, we need to install Selenium driver. The driver depends on the operating system of your machine and the version of your web browser.

We will illustrate the installation steps for Windows,  you may refer to [https://selenium-python.readthedocs.io/installation.html#drivers](https://selenium-python.readthedocs.io/installation.html#drivers) for more detail.

1. Download the zip file containing the chromedriver.exe
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/selenium-driver-zip-file.png" alt="Selenium Drive zip file" caption="Selenium Drive zip file"%}
2. Unzip the folder. Optionally, you can move the folder to another directory
{% include figure.html image="/images/2021-11-27-Web-Scraping-with-selenium/selenium-driver-exe.png" alt="Selenium Drive Executable file" caption="Selenium Drive Executable file"%}


Blog: [https://joeho.xyz](https://joeho.xyz)

LinkedIn: [https://www.linkedin.com/in/ho-cho-tai-0260758a](https://www.linkedin.com/in/ho-cho-tai-0260758a)