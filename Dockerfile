FROM zenika/alpine-chrome:with-node

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

WORKDIR /app
COPY --chown=chrome package.json .

# Install any needed packages specified in package.json
RUN yarn

# Copying the rest of the code to the working directory
COPY --chown=chrome . .

ENTRYPOINT ["tini", "--"]

# Run index.js when the container launches
CMD ["node", "src/index.js"]