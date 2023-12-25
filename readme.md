# KU_OJ: An Online Judge Platform for Khulna University

KU_OJ is an online judge platform for Khulna University students and faculty, where they can create and participate in programming contests and submit code using C/C++, Java and Python. KU_OJ is inspired by Codeforces, a popular online judge for competitive programming.

<a href="ku-oj.vercel.app">Live Link</a>

## Features

- **Contest creation and management**: Users can create contests with custom problems, time limits, scoring systems, and access levels. Users can also edit, delete, or clone existing contests.
- **Contest participation and submission**: Users can join contests and submit code for the problems. Users can view the status, verdict, and score of their submissions, as well as the leaderboard and the submissions of other participants.
- **Problem creation and management**: Users can create problems with custom test cases, input/output formats, constraints, and tags. Users can also edit, delete, or clone existing problems.
- **Problem solving and submission**: Users can solve problems outside of contests and submit code for them using C/C++, Java and Python. Users can view the status, verdict, and score of their submissions, as well as the problem statistics and the submissions of other users.
- **Real-time communication**: Users can chat with other users during contests using WebSocket. Users can also send and receive private messages to and from other users.

## Installation

To install KU_OJ, you need to have Node.js, Redis, and MySQL installed on your system. You also need to clone this repository and install the dependencies using the following commands:

```bash
git clone https://github.com/shahriarKabir44/ku_oj.git
cd ku_oj_API
npm install

```

## How to run it locally using docker

- Clone this repository.
- Run the MySQL docker image

```bash
sudo docker run -p  3300:3306 --name ku_oj_mysql -e MYSQL_ROOT_PASSWORD=<password> -d mysql:latest
```

- Create the database schema.
- - Install Migratify globally and locally  (if not installed)

```bash
npm install -g migratify
```

```bash
npm install  migratify
```

- - Run

```bash
migratify clear
```

- - Run the following command to create the database.

```
migratify create-db
```

- - Run the following command to create the schema.

```bash
migratfy migrate
```

- Now stop the MySQL image.

```bash
sudo docker stop myzone_mysql
```

- Open the docker-compose.yml file and put your database password
- Run the project

```bash
sudo docker-compose up
```

## Backend

The backend part of this project is linked <a href="https://github.com/shahriarKabir44/ku_oj_API">here</a>.

## Preview

Check out the walkthrough video on youtube <https://youtu.be/29oM96NiW58>
