# NormalPeopleJs
 Backend framework based on bun

## Objective
1. A trpc interface. If you are currently using trpc, you can run 
```bash
npx np migrate
```
to auto-rewrite your current trpc routes and file imports.

2. Blazing fast backend framework supports bun runtime. 

3. Full typescript supports.

4. CLI command to deploy anywhere gives you SSH access (unsure, TBC, see [webpod](https://webpod.dev/docs/getting-started))

## The why
 When we were designing and creating normalpeople.js, we were thinking about several things: 
- Built for the people who don't just use Next.js, tired of blocking process from server actions, we want a backend in typescript to support different applications. Including [htmx](https://htmx.org/)
- We wanted a backend framework, not just a BFF(best friend for frontend), meaning it can be a standalone application that can be deployed anywhere with bun runtime. 
- We also really like [trpc](https://github.com/trpc)'s interface, but it doesn't support express/connect out of the box, you will need an additional adapter for it. 

## Features

- Methods
    - json related
    - urlencoding
    - router
    - ALL/GET/PUT/POST/DELETE/LISTEN/USE
- Request
    - baseUrl
    - body
    - cookies
    - hostname
    - ip
    - params
    - response
    - signedCookies
    - get
- Response
    - Properties
        - app
        - headersSent
        - locals
    - Methods
        - append
        - attachment
        - cookie
        - clearCookie
        - download
        - end
        - format
        - get
        - json
        - links
        - location
        - redirect
        - render
        - send
        - sendFile
        - sendStatus
        - set (Content type/headers etc)
        - status
        - type (`.html`, `html`, `json`,`application/json`, `png`)



