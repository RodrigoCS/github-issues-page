# 😺 GitHub Issues Page

### Homework Assignment - Github issues page (with webpack configuration)

Application is being deployed to [https://rodrigocs.github.io/github-issues-page/](https://rodrigocs.github.io/github-issues-page/)

It uses Webpack to bundle the code in a single file with source-maps.

To run the development server use `npm run start`.

To build the bundle file use `npm run build`.

It also has a pre-commit to run `npm run build` so that it is ready for GitHub Pages.

For styling I mainly used `styled-components`.

It uses React Router’s HashRouter in order for it to work on GitHub Pages.

It uses `react-markdown`, `react-syntax-highlighter` and `remark-gfm`, for parsing the markdown from GitHub issues and comments.

It also has a simple cache system, I added it with development porpuses only since unauthenticaded API calls to github where hitting the limit, decided to leave it there and added a `Clear Cache` button.
