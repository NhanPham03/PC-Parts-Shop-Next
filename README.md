# PC Parts Shop (Next)

This is a React [NextJS](https://nextjs.org/) build of the already existing [pc-parts-shop-java](https://github.com/NhanPham03/pc-parts-shop-java) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  

You can access the website on:  
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)]()

### Front-end
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![NextJS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)

### Back-end
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://react-redux.js.org/)

The GitHub for this project's back-end used to handle requests and send responses can be found [here](https://github.com/NhanPham03/pc-parts-shop-django).

## Table of Contents
- [Getting Started](#getting-started)
    - [Install dependencies](#install-dependencies)
    - [Set up environment](#set-up-environment)
    - [Start development server](#start-development-server)
- [Known problems](#known-problems)

## Getting Started
Make sure you have [Node.js](https://nodejs.org/en) installed.

### Install dependencies
First, you will need to install the npm packages and dependencies:
```bash
npm install
#or
npm i
```

### Set up environment
1. Create a `.env` file at the root of the project.
2. Locate and copy the variables from `.env.example` (.../pc-parts-shop-next).
3. Provide a URL for the API where the application will send requests to.
```bash
API_URL="http://127.0.0.1:8000/"
# This is the default host and port for Django REST framework.
```

### Start development server
1. To start the development server, run:
```bash
npm run dev
```
2. Wait until the project finishes starting up...
3. Access [http://localhost:3000](http://localhost:3000) with your browser to start using the web application!

## Known problems
No problems encountered yet!
