# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g @angular/cli
COPY . /app
EXPOSE 4200/tcp
#RUN npm start #executes 'ng serve --host 0.0.0.0' #removed!
CMD ng serve --host 0.0.0.0 #added


## Stage 2
#FROM nginx:1.17.1-alpine
#COPY --from=build-step /app/dist/DisasterApplication /usr/share/nginx/html
