---
title: Attempt To Solve Geetest CAPTCHA
feature_text: |
  Attempt To Solve Geetest CAPTCHA
feature_image: "https://picsum.photos/2560/600?image=873"
excerpt: "Attempt To Solve Geetest CAPTCHA"
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

## CAPTCHA Solving Steps
We will take this CAPTCHA as an example.
1.Download the CAPTCHA. Targets and the main pane are actually from two different pictures, but we don't need to download two pictures, as the targets can also be found in the bottom of the main pane, which is hidden when we open the CAPTCHA in browser. Hence, we just need to download the main pane.

2.Extract each target from the CAPTCHA. We can see that all targets are located at the bottom of main pane with some spaces between two consecutive targets, we can cut the whole area where all targets are on, then separate the targets one by one. There are two approaches:
	a)Hard code the length of space. This method will fail, as it remove remove some part of some targets or add addtional detail to some targets. Hence, out bot need to be smart enough to recognize each target
	b) 
3.Remove the background in the main pane. By doing so, we can reduce the computation and increase accuracy. First, in order to find the targets in main pane, we need to compute the similarity between an area and a target, we can only do this computation on certain areas if we remove unneccssary pixels (i.e. background). Second, the less areas we need to check, the higher accuracy we can obtain.
  
  To remove the background, there are 2 steps.
  
  Convert the CAPTCHA into grey scale picture. It can reduce the computation by a factor of 3, as the total number of pixels in a grey scale picture is one-third of that in original CAPTCHA consisting 3 channels (Red, Green and Blue). Besides, it makes background removal easier, we just need to decide a threshold for grey-scale picture instead of total 3 thresholds for Red, Green and Blue channels.
  
  Set a threshold to remove pixels which have value larger than that, as targets in main pane are constructed by white pixels.
4.Locate the icon candidates. 
  
  Draw a bounding box for each icon in main pane. It serves two purpose.First, it visualizes the result, thus helps me debug. Second, the bounding boxes provide me the exact coordinates, we use coordinates to get a patch of area and resize that patch to the size of targets so that we can enhance the accuracy of our bot.

5.Calcuate the similarity score for "each pair" of candidate and target. As observed, icons and targets have different degrees of rotation, so we should try to calculate the similarity between every rotation of an icon and a target. In order words, the similarity score is the highest similarity between every rotation of an icon and a target. Then, we can base on the similarities for all pairs to determine best fit of candidates for each target.

# Result
Geetest CAPTCHA is quite hard, my bot can only solve 25% of them.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/successful_cracking.gif" alt="Successful Case for cracking CAPTCHA" %}

Basically, my bot cannot overcome the CAPTCHAs because it cannot recognize targets in main pane. On the other hand, given that my bot can recognize targets, the pause between two consecutive clicks is enough to make the system think my bot is a human being.
Here are some reasons that why my bot failed on 75% of all CAPTCHAs.

# Improvement Areas 
There are a few reasons that my bot cannot solve those CAPTCHAs.

First, I use fixed and hard-coded threshold for background removal in all CAPTCHAs, so it cannot cater all CAPTCHAs, either some parts of the icons are removed or too much detail are left in the main pane. 
One approach to solve that is through sampling, we can collect many CAPTCHAs, test different kind of thresholds (Percentage Threshold) which only keep the top several % of brightest pixels, then apply this new "Percentage Threshold" on new CAPTCHAs. 

However, this approach has two drawbacks. It will require many human efforts, as there is no metric to measure how good this Percentage Threshold is, so you need to determine the every possibility of Percentage Threshold by yourself. 
Besides, this approach cannot tackle all CAPTCHAs, as the Percentage Threshold will no longer apply if a new CAPTCHA has a complete different distribution of pixel values.

Second, even though I can find a good threshold which is able separate an icon from the background, it is still insufficient, as the icons may have different color. In other words, we need several excellent thresholds for different icons to separate them from their neightbour background.
I haven't found a good approach for that, feel free to comment if you have good idea!
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/different-colors-icons.jpg" alt="Different Colors Icons" caption="Different Colors Icons" %}

Source Code: URL
This article is also published in Medium: 
 