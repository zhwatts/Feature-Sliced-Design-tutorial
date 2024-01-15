# Feature Sliced Design Tutorial

This repo Is a refactored version of the demo sandbox code, as provided on the [feature sliced design](feature-sliced.design) tutorial page, [https://feature-sliced.design/docs/get-started/tutorial]().

**Getting Started**

_Node 18+ required_

1. Clone Repo
2. ```
   npm install
   ```
3. ```
   npm run dev
   ```
4. open _localhost:5173_ in your browser of choice

## Ihat was refactored?

- migrated from _Create React App_ to _Vite_
- Translated Russian comments to English
- Updates certain libraries to most modern version

## Feature Sliced Design, Overview

**\*Feature-Sliced Design** (FSD) is an architectural methodology for scaffolding front-end applications. Simply put, it's a compilation of rules and conventions on organizing code. The main purpose of this methodology is to make the project more understandable and structured in the face of ever-changing business requirements.\*

The **layers** are standardized across all projects and vertically arranged. Modules on one layer can only interact with modules from the layers strictly below. There are currently seven of them (bottom to top):

1. `shared` — reusable functionality, detached from the specifics of the project/business. (e.g. UIKit, libs, API)
2. `entities` — business entities. (e.g., User, Product, Order)
3. `features` — user interactions, actions that bring business value to the user. (e.g. SendComment, AddToCart, UsersSearch)
4. `widgets` — compositional layer to combine entities and features into meaningful blocks. (e.g. IssuesList, UserProfile)
5. `pages` — compositional layer to construct full pages from entities, features and widgets.
6. `processes` (deprecated) — complex inter-page scenarios. (e.g., authentication)
7. `app` — app-wide settings, styles and providers.

![image](https://github.com/zhwatts/Feature-Sliced-Design-tutorial/assets/9981733/4aa5fd21-be93-4f02-bb5f-26b72145f144)

![image](https://github.com/zhwatts/Feature-Sliced-Design-tutorial/assets/9981733/a5241d70-319e-4dde-8021-a399b1b66335)

