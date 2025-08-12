
  # url_shortner
  nodejs app which will take the url and return a shortened one
  
  ## Get Started  
  npm install       
  npm run start 

  ### Run using Docker 
  docker build -t url_shortner .            
  docker run -p 3000:3000 -e PORT=3000 -e BASE_URL=http://localhost:3000 -e DB_HOST={hostname} -e DB_USER={user} -e DB_PASSWORD={password} -e DB_NAME=neondb -e DB_PORT=5432 -e REDIS_URL={url} url_shortner

  ## Tech stack 
  ExpressJS  
  Postgres        
  Redis
      