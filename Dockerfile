FROM nimeshjohari02/compilerarch:latest
COPY ./ ./
RUN npm install
EXPOSE 8080
CMD [ "npm","start" ]
