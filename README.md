# did-it-crash
A small lambda function to see if a website is down

## Deployment
`zip -r did-it-crash.zip index.js node_modules/ package.json`  

Upload this zip file to lambda.

Configure an SNS topic and an IAM role to allow Lambda to write to CloudWatch and Publish SNS messages.
