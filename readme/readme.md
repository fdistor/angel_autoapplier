# Getting a Google Drive API Key and Enabling Access For This Project

1. Visit the [Google APIs Console](https://console.developers.google.com/)
1. Sign into your Google profile
1. Click on the projects drop down menu and click on **NEW PROJECT**
1. Title the project and click **CREATE**
1. In the API Library, click on **Google Drive API**
1. Click on **ENABLE**
1. Click on **CREATE CREDENTIALS**
1. For the **Which API are you using?** dropdown, select **Google Drive API**
1. For the **Where will you be calling the API from?** dropdown, select **Web server (e.g. node, Tomcat)**
1. For the **What data will you be accessing?** radio buttons, select **Application data**
1. For the **Are you planning to use this API with App Engine or Compute Engine?** radio buttons, select **No**
1. Click on **What credentials do I need?**
1. Enter in any name for **Service account name**
1. For the **Role** dropdown, select **Project>Editor**
1. Leave the **Key type** as **JSON**
1. Click on **CONTINUE** and your API key will be downloaded
1. Move this json file to the project folder under the `keys` folder and rename it to `client_secret.json`
1. In `client_secret.json`, copy the `client_email` value
1. Visit your Google Sheet and click on **SHARE** in the top right corner
1. In the **People** input text box, paste the `client_email` value you copied and click **Send**
