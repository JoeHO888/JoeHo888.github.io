---
title: Primary-Key-Design-In-AWS-DynamoDB
categories:
- AWS
- DynamoDB
excerpt: |
  An experience sharing on how to design AWS DynamoDB primary key to facilitate its API calls
feature_text: |
  ## Joe Ho Blog
  Primary Key Design In AWS DynamoDB
feature_image: "https://picsum.photos/2560/600?image=733"
image: "https://picsum.photos/2560/600?image=733"
---

## Background
AWS DynamoDB is a key-values database, every item in DynamoDB is associated an unique primary key which is required in almost all DynamoDB's APIs, so having a good design on this primary key is crucial for your development.

## What's primary key in DynamoDB
A primary key is used to identity an item in DynamoDB uniquely. In general, there are two types of primary key.
1. Constructed by partition key solely
2. Constructed by partition key and sort key

Example:
{% include figure.html image="/images/2020-02-27-Primary-Key-Design-In-AWS-DynamoDB/dynamodb-primary-key.gif" alt="Dynamodb Primary Key Example" caption="Dynamodb Primary Key Example" %}

### Partition Key
DynamoDB uses partition key to partition a table, items having the same partition key will be stored in the same partition. 
Worth mentioning, if your primary key is composed by partition key only, each partition will only have a single item, as all items have different partition key.

Partition key is required in most of the DynamoDB queries, a bad partition key will make DynamoDB access a single partition key frequently (3000 Read or 1000 Write per second), which may causes request throttling.
To avoid that, the partition key should be high cardinality. For example, it can be an uuid or you may combine multiple several low cardinality attributes to generate a high cardinality attrtibue for partition key.

### Sort Key
Sort key does not alter the table like partition key does, it helps you to extend and refine your DynamoDB queries.
For example, you can use sort key to filter items larger than certain thresholds after you retrieve the whole partiion with partion key.

One of the limitations in DynamoDB is that, you can only use partition key and sort key for most of DynamoDB queries. In other words, you should set an attribute as a sort key if you anticipate it would be used for queries.
Remark: It is still feasible to filter items in DynamoDB other than partition key and sort key, but it is expensive in terms of price and performance.

There are some use cases for sort key.
1. Consider a note-taking app. You can create a DynamoDB table which uses userId as partition key and noteId as sort key. In this scenario, you can use userId to retrieve all notes of the user and you can also get a specify note by providing userId and noteId.
2. You can also use sort key to define hierarchical relationships. For example, in a table listing geographical locations, sort key can be defined [country]#[region]#[state]#[county]#[city]. In this scenario, you use "begin with" operatio to filter items with specify count, country and region pairs, etc.

## Post-Exam
After you complete the exam, you will know the result immediately. It describes how good you perform in areas which the exam examines, you can further learn from areas you are rather weak at.

If you pass the AZ-900 Exam, you can view your certification on dashboard and share the link which someone else can view your certification.

This post is also publised in Medium, [https://medium.com/@joeho_15265/20-hours-to-pass-azure-exam-az-900-b8afe5383ce4](https://medium.com/@joeho_15265/20-hours-to-pass-azure-exam-az-900-b8afe5383ce4)

Blog: [https://joeho888.github.io/](https://joeho888.github.io/)

LinkedIn: [https://www.linkedin.com/in/ho-cho-tai-0260758a/](https://www.linkedin.com/in/ho-cho-tai-0260758a/)
