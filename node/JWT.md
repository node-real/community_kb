# Use JWT to access NodeReal API 

Today, Let`s talk about the security of NodeReal API services.

![img](https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNlY3VyaXR5fGVufDB8fDB8fA%3D%3D&w=1000&q=80)

## JWT of NodeReal Service

Security is our top priority when we provide the RPC service as your entrance to the blockchain. First, we use API tokens as your identification when you access our service, and all traffics between your appliction and our services are encrypted, no matter you use our https or web sockets sessions. However, Many users are asking about the additional security measure to gurantee the safety of the NodeReal service access. Now, NodeReal supports the JWT(JSON Web Tokens,pronounced "jot") to allow you add layers of security of your NodeReal access.

In NodeReal, the JWT is used as a Proof of Possession token (a PoP token). That means you add your signature in the token as a confirmation of claim. I will explain the details to you later in this article. 

## Why JWT

Let`s compare the JSON Web Tokens(JWT), Simple Web Tokens(SWT) and Security Assertion Markup Languange Tokens(SAML).

| Type | Size    | Security                 |
| ---- | ------- | ------------------------ |
| SWT  | Compact | Symetrically Signed Only |
| JWT  | Compact | Public/Private key       |
| SAML | Verbose | Public/Private key       |

As XML is more verbose than JSON, it is encoded its size is also bigger, making SAML is less compact with JWT, therefore JWT is a good choice to be passed in HTML and HTTP environments.

At the same time, SWT can only be singed with Sysmetrically algorithm, which can increase the risk of token leak. 

## How to create a JWT

### Generate your RSA-256 key pair

You need a RSA-256 keys to start using JWT to access NodeReal service. You can generate the private/public key pair by command below.

```shell
openssl genrsa -out jwtRSA256-private.pem 2048
openssl rsa -in jwtRSA256-private.pem -pubout -outform PEM -out jwtRSA256-public.pem
```

### Enable JWT for your NodeReal app

After you login to NodeReal, you can enter settings and under security page, click the "Enable JWT for All Requests". Then copy and paste your public key to the JWT Public Key filed, click add button.

![img](https://3273513804-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FoXY90dh2y66ykYGiiavc%2Fuploads%2FghWTGTfZrXuVqLlkI6Lg%2FScreen%20Shot%202022-07-04%20at%2011.06.14.png?alt=media&token=d1f797da-1259-4ba2-acbc-6cb567a7a58e)

You will get a JWT public key record as below. You need copy the ID here for the JWT generatation.

![img](https://3273513804-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FoXY90dh2y66ykYGiiavc%2Fuploads%2FkUgnhmXkmfIZxsFUWYIS%2FScreen%20Shot%202022-07-07%20at%2016.27.58.png?alt=media&token=00966bd4-d754-40f5-a0e9-4150915c3ef6)



### Generate your JWT 

You can login to the [jwt](jwt.io) to generate your JWT. Open debugger, and enter the corresponding information. 

Enter the Header configuration. You can copy your kid from the public key record mentioned above.

```json
{
  "alg": "HS256",
  "typ": "JWT",
  "kid": "a0935738-6fc8-4a78-9fe7-650ab965ee16"
}
```

Let`s encypt header.

```shell
echo -n '{"alg": "HS256","typ": "JWT","kid": "a0935738-6fc8-4a78-9fe7-650ab965ee16"}' | base64 | sed s/\+/-/ | sed -E s/=+$//
```

Enter Payload information. You need enter your audiance info and expiration settings. You need use epoch(Unix Time) to set your expiration time. 

For example, you need set your expiration date to 2022-07-10 15:58:50, you can use the command date to generate the corresponding unix time. 

> Please note, the maximum expiration duration is 24 hours. 

```shell
date -j -f "%Y-%m-%d %H:%M:%S" "2022-07-10 15:58:50" "+%s"
1657461530
```

And then set the payload info.

```json
{
  "aud": "nodereal.io",
  "exp": "1657461530"
}
```

Encrypt the payload

```bash
echo -n '{"aud": "nodereal.io","exp": "1657461530}' | base64 | sed s/\+/-/ | sed -E s/=+$//
```

Now signature with your private key

```bash
echo -n "eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiSldUIiwia2lkIjogImEwOTM1NzM4LTZmYzgtNGE3OC05ZmU3LTY1MGFiOTY1ZWUxNiJ9.eyJhdWQiOiAibm9kZXJlYWwuaW8iLCJleHAiOiAiMTY1NzQ2MTUzMH0" | openssl dgst -sha256 -binary -sign jwtRSA256-private.pem  | openssl enc -base64 | tr -d '\n=' | tr -- '+/' '-_'

```

Now let`s make the JWT generation simple. 

```shell
header=`echo -n '{"alg": "RS256","typ": "JWT","kid": "c6a5278e-ce1d-4f54-b7fa-f8d90f8b5756"}' | base64 | sed s/\+/-/ | sed -E s/=+$//`

payload=`echo -n '{"aud": "nodereal.io","exp": "1657461530"}' | base64 | sed s/\+/-/ | sed -E s/=+$//`

sig=`echo -n "$header.$payload" | openssl dgst -sha256 -binary -sign jwtRSA256-private.pem  | openssl enc -base64 | tr -d '\n=' | tr -- '+/' '-_'`

jwt=`echo $header.$payload.$sig`
```

Test with your JWT token

```shell
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $jwt" \
--data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}' \
"https://eth-mainnet.nodereal.io/v1/0c7baa68f8e147cfa1cca6cf54eb6d24"
```


