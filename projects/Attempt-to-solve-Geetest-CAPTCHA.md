---
title: Attempt To Solve Geetest CAPTCHA
feature_text: |
  Attempt To Solve Geetest CAPTCHA
feature_image: "https://picsum.photos/2560/600?image=873"
excerpt: "Attempt to solve Geetest CAPTCHA"
aside: true
---

# What is Geetest CAPTCHA?
In today's digital era, about 40% of network traffice is driven by bot. Usually, we only want human access our applications. For example, we want to prevent Ticket Bots for concerts. That's where CAPTCHA comes in. CAPTCHA stands for "Completely Automated Public Turing test to tell Computers and Humans Apart", it is a kind of test distinguish Human from Computing and thus blocks the bots.

Traditional CAPTCHAs typically ask you to recognize the text from a image of printed text under some shape deformations. With technology advance, more bots can solve these CAPTCHAs. Hence, some companies are designing more complicated to challenge bots, Geetest is one of them.Geetest's CAPTCHAs determine if you are human by your answer and how you answer CAPTCHAs (e.g. a human being cannot answer a test in less than 0.01s).

# CAPTCHA Solving Time
The kind of Geetest CAPTCHA] I tried to solve is as below. It requires your bot to click the icons on the main pane according to the targets indicated and act like a human being.It is easy to make your bot act like a human being, you just need to introduce some pause between two consecutive clicks. Therefore, the rest of this article will focus on how to find those targets in main pane.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/icon-CAPTCHA-example.jpg" alt="CAPTCHA Example" %}
Remark: CAPTCHA is available at [https://www.geetest.com/en](https://www.geetest.com/en), 
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/demo-page.jpg" alt="CAPTCHA Demo Page" %}

## Technology Stack
1. Selenium (Atutomatically to click the maine pane of the CAPTCHA)
2. OpenCV (Image Processing, finding the targets on the main pane)
3. Other Libraries (matplotlib, urllib, numpy, scipy, skimage, time, Pillow)

# Result
Geetest CAPTCHA is quite hard, my bot can only solve 25% of them.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/successful_cracking.gif" alt="Successful Case for cracking CAPTCHA" %}

# Improvement Areas 
There are a few reasons that my bot cannot solve those CAPTCHAs.

First, I use hard-coded threshold for all CAPTCHAs, which aims to remove background. However, it is fixed in all CAPTCHAs, so it cannot cater all CAPTCHAs, images after thresholding either remove part of the icons or leave too much background.
Second, My bot assumes the icons are white, which are wrong sometimes. In some CAPTCHAs, some of the icons are black. What's more, the icons may share similar color as background (It makes a human being to solve as well...)


 