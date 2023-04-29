import json
import requests

def lambda_handler(event, context):
    # Check if 'queryStringParameters' and 'metadata_url' keys are present
    if event.get('queryStringParameters') and event['queryStringParameters'].get('metadata_url'):
        metadata_url = event['queryStringParameters']['metadata_url']
    else:
        # Return an error response if 'metadata_url' is missing
        return {
            'statusCode': 400,
            'body': 'Error: metadata_url parameter is missing in the query string'
        }

    response = requests.get(metadata_url)
    nft_metadata = response.json()

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(nft_metadata)
    }
