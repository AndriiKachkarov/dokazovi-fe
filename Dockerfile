# build environment
FROM node:current as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL
ENV REACT_APP_GOOGLE_ID notSecret
ENV REACT_APP_IMGUR_CLIENT_ID notSecret
COPY package.json ./
RUN yarn install --immutable
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

