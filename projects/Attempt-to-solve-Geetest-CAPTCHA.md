---
title: Attempt To Solve Geetest CAPTCHA
feature_text: |
  Attempt To Solve Geetest CAPTCHA
feature_image: "https://picsum.photos/2560/600?image=873"
excerpt: "Attempt To Solve Geetest CAPTCHA"
aside: true
---

## What is Geetest CAPTCHA?
In today's digital era, about 40% of network traffic is driven by bot. Usually, we only want human access our applications. For example, we want to prevent Ticket Bots for popular concerts. That's why CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) comes into play, we use it to distinguish Human from bots and thus blocks the bots

Traditional CAPTCHAs typically ask you to recognize the text from a image of printed text under some shape deformations.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/old-CAPTCHA.jpg" alt="Traditional CAPTCHA" caption="Traditional CAPTCHA" %}

With technology advance, more bots can solve these CAPTCHAs. Hence, some companies are designing more complicated CAPTCHAs to challenge bots, [Geetest](https://www.geetest.com/) is one of them. Geetest's CAPTCHAs determine if you are human by your answer and how you answer CAPTCHAs (e.g. a human being cannot answer a test in less than 0.01s).

## CAPTCHA Background
The kind of Geetest CAPTCHA I try to solve is as below. 

{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/icon-CAPTCHA-example.jpg" alt="CAPTCHA Example" %}

There are some icons in the CAPTCHA. They may look like what the CAPTCHA asks you to select, or not. You need to select these icons in order specified by the CAPTCHA. On top of that, the solving process should be like a human being solving the CAPTCHA, e.g. if you can solve the CAPTCHA under 0.1 seconds, you will fail in the CAPTCHA.

Here's a Geetest CAPTCHA I am able to crack with image processing and automation technology. In this following sections, I will share how I try to crack the CAPTCHA.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/successful_cracking.gif" alt="Successful Case for cracking CAPTCHA" %}

Remark: [English CAPTCHA](https://www.geetest.com/en) was available previously, but it is unavailable now. However, [chinese version](https://www.geetest.com/show) of this kind of CAPTCHA is still available, so I will use chinese CAPTCHA in below demonstration section.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/english-demo-page.jpg" alt="English CAPTCHA Demo Page" caption="English CAPTCHA" %}
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/chinese-demo-page.jpg" alt="Chinese CAPTCHA Demo Page" caption="Chinese CAPTCHA" %}

## Technology Stack
1. Selenium (Make our bot behave like a human being to click the icons in CAPTCHA)
2. OpenCV (Our bot uses it to solve the CAPTCHA through Image Processing and Object Detection)
3. Other Libraries (matplotlib, urllib, numpy, scipy, skimage, time, Pillow)

## Terminology
To explain the solving steps below, a few terms will be used to describe different parts of the CAPTCHA.
1. Main Pane - The area containing several icons and the background
2. Targets - What we going to find in the main pane
3. Target Pane - The area containing all targets
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/terminology-picture.jpg" alt="Picture for terminology explanation" caption="Green: Icons, Blue: Main Pane, Yellow: Target" %}

## CAPTCHA Solving Steps
We will take this CAPTCHA as an example.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/demo-CAPTCHA-capture.jpg" alt="CAPTCHA Demo"%}

### 1. Download the CAPTCHA

To download the CAPTCHA, we just need to download the main pane, as it also contains the targets at the bottom. Main pane belongs to "geetest_item_img" class, you may find it in browser debug console.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/download-CAPTCHA.jpg" alt="Picture for terminology explanation" caption="Search 'geetest_item_img' to obtain the geetest CAPTCHA" %}
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/demo-CAPTCHA.jpg" alt="Demo CAPTCHA" caption="Demo CAPTCHA" %}

### 2. Remove the background in the main pane 

Background removal can help us improve accuracy, as the bot may recognize some parts of the background as an icon which is a kind of  false positive.

To remove the background, there are 2 steps.
  
Convert the CAPTCHA into grey scale picture. It can reduce the computation complexity by a factor of 3, as the total number of pixels in a grey scale picture is one-third of that in original CAPTCHA consisting 3 channels (Red, Green and Blue). Besides, it makes background removal easier, we just need to decide a threshold for grey-scale picture instead of total 3 thresholds for Red, Green and Blue channels.

``` python
img_grey = cv2.imread(image_path,0) # image_path is the path where the CAPTCHA stored
```

Set a threshold to remove pixels in main_pane which have value larger than that, as targets in main pane are constructed by white pixels.

``` python
# crop image
main_pane = img_grey[:350,:] # Extract the main_pane from the CAPTCHA
color_threshold = 180
main_pane = cv2.blur(main_pane,(3,3)) # Adequate blurring can reduce image noise
main_pane[main_pane<color_threshold] = 0
main_pane[main_pane>=color_threshold] = 255	
  ```
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/preprocessed_main_pane.jpg" alt="Remove background in main_pane" caption="Remove background in main_pane" %}
Remark: 
Blurring make each pixel being affected by its  surrounding pixels. In this case, some noise (or some pixel has extraordinary higher/lower value) will be "compensated" by the values nearby, thus can be removed.

In terms of mathematics, blurring is to convolve a kernel with an image, which is the same technique used in Convolutional neural network (a kind of state of art in Deep Lerning/Artificial Intelligence). You may refer to below materials for more information.

References:
1. [https://en.wikipedia.org/wiki/Gaussian_blur](https://en.wikipedia.org/wiki/Gaussian_blur)
2. [https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_imgproc/py_filtering/py_filtering.html](https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_imgproc/py_filtering/py_filtering.html)

### 3. Locate where the icons are in the main pane

The basic idea is to extract the external boundary of each icon, then we can get some "critical" points of that boundary (i.e. the points can form the boundary via joining them with various straight lines.). After that, we can draw the bounding box (a.k.a rectangle) from these points by comparing these points' x and y coordinates, e.g. top left corner of the boundary box is the top left point

Draw a bounding box for each icon in main pane. It serves two purpose.First, it visualizes the result, thus helps me debug. Second, the bounding boxes provide me the exact coordinates, we use coordinates to get a patch of area and resize that patch to the size of targets so that we can enhance the accuracy of our bot.

```
_, contours, hierarchy = cv2.findContours(pane, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE) #Calculate the contours. Boundary is the layman term of contour
```

```
(x, y, w, h) = cv2.boundingRect(contour) #Obtain the coordinates of top left corner (x,y), width and height of bounding box
```
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/icons-located-in-main-pane.jpg" alt="Locate icons in the main pane" caption="Locate icons in the main pane" %}
Remark:
The boundary we are looking for is  external boundary, so that we can obtain the largest boundary box for the icon and avoid too many computation if we obtain all boundaries. A counter example is as below: https://docs.opencv.org/3.4/d9/d8b/tutorial_py_contours_hierarchy.html

### 4.  Locate where the targets at the bottom
Targets are not in tidy and proper manner, so we need to detect them. We can use the method described in last step to extract them without extra image processing, as the targets are already in black while the background are in white.
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/targets-located-in-main-pane.jpg" alt="Locate targets at the bottom" caption="Locate targets at the bottom" %}

### 5. Calcuate the similarity for each pair of icons and targets
Actually, we do not only compare the similarity between each pair of icons and targets. Instead, we keep rotate the target and compare the similarity between each rotation of it and an icon, then denotate the highest similarity as the similarity of that target and icon. Why are we doing so? Because the icons and targets have different degrees of rotation, doing so can improve the accuracy.

```
# Rotate the target by d degree each time and calculate the similarity
def calculate_max_matching(target,icon,d):
    largest_val = 0
    for degree in range(0,360,d):
        rotated_target = ndimage.rotate(target, degree, reshape=False) # rotated_target is a transformation of target under certain degree of rotation
        res = cv2.matchTemplate(icon,rotated_target,cv2.TM_CCOEFF_NORMED) #Calculate the similarity
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res) #Calculate the similarity
        if max_val > largest_val:
            largest_val = max_val
    return largest_val
```

Remark:
cv2.matchTemplate used above is decided for object detection. Therefore, we can use this after we get the target to finde the target location in main pane theoretically. 

However, we will have low accuracy if we apply it directly. First, targets and icons in the CAPTCHA are not similar, we will have lots of false positive if we do not do some cleansing beforehand (e.g. background removal and thresholding). Second, targets and icons are in the same size, the cv2.matchTemplate can not handle this scenario. (We actually do some resizing, but it is rather trival, so we do not discuss it here)
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/match-icons-with-targets.jpg" alt="Match icons in main_pane with targets" caption="Match icons in main_pane with targets" %}

### 6. Let our bot click the icons selected.

We use selenium to simulate a human being to click the icons one by one with random pause between two consecutive clicks.

```
ele=driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Loading'])[1]/following::div[1]")
action = webdriver.common.action_chains.ActionChains(driver)
action.move_to_element_with_offset(ele, centre_x, centre_y) #  centre_x, centre_y are the x,y coordinates of center of selected icon
time.sleep(randint(100,700)/1000) # random pause
action.click()
action.perform()
```
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/complete-demo-CAPTCHA.gif" alt="Solve the CAPTCHA" caption="Solve the CAPTCHA" %}

## Result
Geetest CAPTCHA is quite hard, my bot can only solve 25% of them.

Basically, my bot cannot overcome the CAPTCHAs because it cannot recognize targets in main pane. On the other hand, given that my bot can recognize targets, the pause between two consecutive clicks is enough to make the system think my bot is a human being.
Here are some reasons that why my bot failed on 75% of all CAPTCHAs.

## Improvement Areas 
There are a few reasons that my bot cannot solve those CAPTCHAs.

First, I use fixed and hard-coded threshold for background removal in all CAPTCHAs, so it cannot cater all CAPTCHAs, either some parts of the icons are removed or too much detail are left in the main pane. 

One approach to solve that is through sampling, we can collect many CAPTCHAs, test different kind of thresholds (Percentage Threshold) which only keep the top several % of brightest pixels, then apply this new "Percentage Threshold" on new CAPTCHAs. 
However, this approach has two drawbacks. It will require many human efforts, as there is no metric to measure how good this Percentage Threshold is, so you need to determine the every possibility of Percentage Threshold by yourself. 
Besides, this approach cannot tackle all CAPTCHAs, as the Percentage Threshold will no longer apply if a new CAPTCHA has a complete different distribution of pixel values.

Another approach is to adopt Adaptive Thresholding which determines the threshold for a pixel based on a small region around it. I think it is rather promising, but I haven't tried this.

Second, even though I can find a good threshold which is able separate an icon from the background, it is still insufficient, as the icons may have different color. In other words, we need several excellent thresholds for different icons to separate them from their neightbour background.
I haven't found a good approach for that, feel free to comment if you have good idea!
{% include figure.html image="/images/Attempt-To-Solve-Geetest-CAPTCHA/different-colors-icons.jpg" alt="Different Colors Icons" caption="Different Colors Icons" %}

Source Code: [https://github.com/JoeHO888/Geetest-Icon-CAPTCHA-Solving](https://github.com/JoeHO888/Geetest-Icon-CAPTCHA-Solving)

This article is also published in Medium: 
 