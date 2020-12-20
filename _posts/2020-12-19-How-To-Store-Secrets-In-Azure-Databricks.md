---
title: How to store secrets in Azure Databricks
categories:
- Azure
- Azure Databricks
excerpt: |
  We often need to use secrets to access other services in Azure Databricks, but how can we protect these secrets?
feature_text: |
  ## Secret Management in Azure Databricks
feature_image: "https://picsum.photos/2560/600?image=733"
image: "https://picsum.photos/2560/600?image=733"
---

## Background
In Azure Databricks, we can write code to perform data transformation on data stored in various Azure Services, e.g. Azure Blob Storage, Azure Synapse. However, as other programs, sometimes, you want to protect credentials used in Azure Databricks, Azure Databricks provides a solid secret management approach to help you achieve that.

## Steps

### Prepare Databricks command-line interface (CLI) in Azure Cloud Shell

#### Configure your cloud shell environment

Open Cloud Shell & make sure you select “Bash” for the Cloud Shell Environment.

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/bash-cloud-shell.jpg" %}

#### Set up Virtual Environment
Create Virtual Environment with below command.

```
# Bash
virtualenv -p /usr/bin/python2.7 databrickscli
```

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/create-virtual-environment.jpg" %}

#### Activate your virtual environment

Activate your virtual environment with below command.

```
# Bash
source databrickscli/bin/activate
```

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/activate-virtual-environment.jpg" %}

#### Install Databricks CLI
Install Databricks CLI with below command.

```
# Bash
pip install databricks-cli
```

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/install-databricks-cli.jpg" %}

### Create secret in Azure Databricks

#### Set up authentication
Before you can create a secret, you need to authenticate as a user of the Azure Databricks, which requires your Azure Databrics workspace’s URL and a token

##### Get your Azure Databricks workspace’s URL
You can navigate to your Azure Databricks workspace and copy its URL.

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/databricks-url.jpg" %}