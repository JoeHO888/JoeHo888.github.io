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

##### Generate Access Token for your Azure Databricks workspace
You can follow below steps to retrieve access token

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/launch-databricks-workspace.jpg" caption="Launch Databricks Workspace"%}

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/databricks-user-settings.jpg" caption="Click 'User Settings'"%}

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/generate-access-token.jpg" caption="Click 'Generate New Token' "%}

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/configure-access-token.jpg" caption="Configure access token & click 'Generate'"%}

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/copy-access-token.jpg" caption="Copy access token"%}


#### Create Secret Scope
After authentication, you need to first create a secret scope which you may group several secrets. 

If your databricks is in Standard plan, you can only create secret scope which will be shared with other users in the same workspace.

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/check-databricks-plan.jpg" caption="Check databricks plan"%}

```
# Bash
databricks secrets create-scope --scope <<scope>>

Example: 
databricks secrets create-scope --scope storage --initial-manage-principal users # Standard Plan
databricks secrets create-scope --scope storage # Premium plan
```

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/create-secret-scope.jpg" caption="Create secret scope"%}

#### Create Secret
You can use below command to create secret under the specified scope.
```
# Bash
databricks secrets put --scope <<scope>> --key <<key name>>

Example: databricks secrets put --scope storage --key blob
```

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/launch-secret-editor.jpg" caption="Type command to launch secret editor"%}

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/type-secret.jpg" caption="Type your secret and save"%}

#### Use Secret in Notebook
You can use secret by below command in notebook.

```
# Python
dbutils.secrets.get(scope=<<scope>>,key=<<key>>)

Example: dbutils.secrets.get(scope=storage,key=blob)
```

{% include figure.html image="/images/2020-12-19-How-To-Store-Secrets-In-Azure-Databricks/notebook-demo.jpg" caption="Demo"%}

Blog: [https://joeho888.github.io/](https://joeho888.github.io/)

LinkedIn: [https://www.linkedin.com/in/ho-cho-tai-0260758a/](https://www.linkedin.com/in/ho-cho-tai-0260758a/)
