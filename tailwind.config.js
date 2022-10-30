module.exports = {
  content: [
    './app/views/**/*.html',
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
