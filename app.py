import json
import boto3
import requests
import os

def lambda_handler(event, context):
    # Get urls from environment variables
    # They are split with a ;
    # EX: https://google.com;https://youtube.com
    urls = os.environ['urls']
    failed = []
    for url in urls.split(";"):
        try:
            resp = requests.get(url, timeout=180)
            if resp.status_code != 200:
                failed.append(url)
                print("%s failed - non 200 response" % url)
            else:
                print("%s succeeded" % url)
        except:
            # This has failed, add to the failed list
            failed.append(url)
            print("%s failed - timeout" % url)

    if failed:
        numberOfFails = len(failed)

        # Construct message
        message = "%s failed:\n" % numberOfFails
        for url in failed:
            message += url +"\n"

        # Contact me
        client = boto3.client('sns')
        client.publish(
            TopicArn=os.environ['DidItCrashSNSARN'],
            Message=message
        )
    