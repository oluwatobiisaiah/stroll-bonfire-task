# Documentation 
## Set Up
To run the app, the following must be installed:
<ul>
<li>Node</li>
<li>MySQL</li>   
<li>Redis</li>
</ul>

### Install the packages
` yarn install` or `npm install`

### Run the app
`yarn run dev` or `npm run dev`

## Design Process
The application was designed with scalability in mind, first; I assumed that the user's region or country is not determined automatically by ip address on the backend but rather by geolocation on the client app (Mobile App), helping me to safely have a database of regions or countries in which the app is being used. I implemented four endpoints for this task:
<ul>
<li>POST Create Questions</li>
<li>GET Get All Questions</li>
<li>GET Get Single Question</li>
<li>GET Get User Region Question</li>
</ul>

### Database Design
The app makes operates on MySQL, and this was considered because that is a simpler approach for this task over PostgreSQL and MongoDB. I initially thought of using CassandraDB for the app but that is going to be another layer of complexity added to the implementation; MySQL is simple and fast. The database consists of the `question`, `options`, `appUserRegion`, `selectedQuestion` tables, the `question` and `options` contains questions and corresponding options if available, while the `selectedQuestion` table tracks questions that has been previously served to a region, just to avoid serving repeated questions with time.

### Caching 
To maintain high throughput and low latency in the system, I implemented a time based caching for the questions per region or country using Redis; other free and open source otpions can be considered in production. When the cache is set, it is set with the rotation duration; if the rotation duration is set to be 7 days(which it is by default) the cache for the region question is set for 7 days after which questions are assigned again by the system. This makes the region question load at the speed of light, instead of searching through the databasee for the question assigned to the region or country.

### Scheduling and Cycling
I'd normally think of using a CRON job to perform this task, but considering the fact that the most common hosting services for backend services nowadays are serverless infrastructure like AWS Lambda, Vercel,etc of which the function may be not invoked at the point when the CRON Job is meant to run which may cause missing the cycling. So, I implemented the question cycling feature using a message queue; specifically bullMQ to run repeated jobs after a Worker has been spawn up alongside with the app. BullMQ helps manage the job scheduling perfectly well, the cycling will be performed on every of the cycle rotation day, which is 7 days by default in the environmental variable. And the day start by default on Monday 7PM(Singapore Time)

## What could have been done better
Currently, the only issue I still have is running this job/ scheduling on the same process, probably I can use pm2 to manage the processes, but I really don't want to complicate things for now as this is a test app. 