---
title: How to do string interpolation in Azure Data Factory
categories:
- Azure
- Azure Data Factory
excerpt: |
  Inserting your variables into String in Azure Data Factory may be annoying, this guide discuss how to make it easily with string interpolation.
feature_text: |
  ## How to put your variables insider String Expression in Azure Data Factory
feature_image: "https://picsum.photos/2560/600?image=733"
image: "https://picsum.photos/2560/600?image=733"
---

## Background
Azure Data Factory allows us to add dynamic content in certain fields. Sometimes, we want to insert the value of variables, value of function or output of last activity into our string for dynamic content.

{% include figure.html image="/images/2020-12-05-How-To-Do-String-Interpolation-Azure-Data-Factory/background-image.jpg" alt="String Interpolation Example Illustration" caption="String Interpolation Example Illustration"%}

## Solution
There are two approaches to achieve that. 

1. Azure Data Factory’s built-in function “concat” 
2. String Interpolation in Azure Data Factory 

### Azure Data Factory’s built-in function “concat” 
Azure Data Factory has a built-in function “concat” which helps us concatenate  string together, but this makes the dynamic content less readable. 

{% include figure.html image="/images/2020-12-05-How-To-Do-String-Interpolation-Azure-Data-Factory/concat-function-example.jpg" alt="Use built-in ‘concat’ function in Dynamic Content Modal" caption="Use built-in ‘concat’ function in Dynamic Content Modal"%}

{% include figure.html image="/images/2020-12-05-How-To-Do-String-Interpolation-Azure-Data-Factory/output.jpg" alt="Output — Azure Data Factory built-in ‘concat’ function" caption="Output — Azure Data Factory built-in ‘concat’ function"%}

### String Interpolation in Azure Data Factory 
Actually, we can do string interpolation in Azure Data Factory, which is similar to other programming languages, this approach can make our dynamic content much more to comprehend. 

To achieve string interpolation, please put your variable inside “@{}”, i.e. @{your_variable_expression}. For example, it should be “@{variables(‘variable_name’)}” if your variable name is “variable_name”.

{% include figure.html image="/images/2020-12-05-How-To-Do-String-Interpolation-Azure-Data-Factory/string-interpolation-example.jpg" alt="Use String Interpolation in Dynamic Content Modal" caption="Use String Interpolation in Dynamic Content Modal"%}

{% include figure.html image="/images/2020-12-05-How-To-Do-String-Interpolation-Azure-Data-Factory/output.jpg" alt="Output — Azure Data Factory String Interpolation" caption="Output — Azure Data Factory String Interpolation"%}

#### Bonus: Call functions with String Interpolation
On top of that, String Interpolation allows you to call other Azure Data Factory built-in functions inside the expression. 

{% include figure.html image="/images/2020-12-05-How-To-Do-String-Interpolation-Azure-Data-Factory/bonus-example.jpg" alt="Use String Interpolation in other functions" caption="Use String Interpolation in other functions"%}

{% include figure.html image="/images/2020-12-05-How-To-Do-String-Interpolation-Azure-Data-Factory/bonus-output.jpg" alt="Output — String Interpolation inside other functions" caption="Output — String Interpolation inside other functions"%}

Medium Post: [https://joeho-15265.medium.com/how-to-do-string-interpolation-in-azure-data-factory-8d2f56e192ee](https://joeho-15265.medium.com/how-to-do-string-interpolation-in-azure-data-factory-8d2f56e192ee)

Blog: [https://joeho888.github.io/](https://joeho888.github.io/)

LinkedIn: [https://www.linkedin.com/in/ho-cho-tai-0260758a/](https://www.linkedin.com/in/ho-cho-tai-0260758a/)