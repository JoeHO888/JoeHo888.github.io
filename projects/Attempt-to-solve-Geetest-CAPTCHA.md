---
title: Attempt to solve Geetest CAPTCHA
feature_text: |
  Attempt to solve Geetest CAPTCHA
feature_image: "https://picsum.photos/2560/600?image=873"
excerpt: "Attempt to solve Geetest CAPTCHA"
aside: true
---

# What is Geetest CAPTCHA?
In today's digital era, about 40% of network traffice is driven by bot. Usually, we only want human access our applications. For example, we want to prevent Ticket Bots for concerts.
That's where CAPTCHA comes in. CAPTCHA stands for "Completely Automated Public Turing test to tell Computers and Humans Apart", it is a kind of test distinguish Human from Computing and thus blocks the bots.
Traditional CAPTCHAs typically ask you to recognize the text from a image of printed text under some shape deformations. With technology advance, more bots can solve these CAPTCHAs. Hence, some companies are designing more complicated to challenge bots, Geetest is one of them.
Geetest's CAPTCHAs determine if you are human by your answer and how you answer CAPTCHAs (e.g. a human being cannot answer a test in less than 0.01s). Here are two examples on Geetest CAPTCHAs.

# Icon CAPTCHA
You need to click the icon in the the top left corner...

# CAPTCHA Solving Strategy
To successfully solve Icon CAPTCHA, your bot need to succeed in two areas.
First, your bot need to answer the test correctly.
Second, your bot need to behave like a human being while answering. When someone solve a CAPTCHA, it often takes he/she some time to think. Hence, we can solve it by introducing some pause between two consecutive clickings.

1. Answer the test correctly
2. Make your bot behave like a human being 


# Technology Stack
1. Selenium (Atutomatically to click some buttons on the CAPTCHA)
2. OpenCV (Image Processing, including recognize the icons)

# Result
Geetest CAPTCHA is quite hard, my bot can only solve 25% of them.

# Improvement Areas 
There are a few reasons that my bot cannot solve those CAPTCHAs.

First, I use hard-coded threshold for all CAPTCHAs, which aims to remove background. However, it is fixed in all CAPTCHAs, so it cannot cater all CAPTCHAs, images after thresholding either remove part of the icons or leave too much background.
Second, My bot assumes the icons are white, which are wrong sometimes. In some CAPTCHAs, some of the icons are black. What's more, the icons may share similar color as background (It makes a human being to solve as well...)

 