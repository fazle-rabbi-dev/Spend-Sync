export const About = () => {
  return (
    <section class="prose md:prose-xl dark:text-white">
      <img className="border-[.5px] border-gray-400 p-2" height="auto" width="100%" src="/thumbnail.jpg" alt="Spend-Sync - Thumbnail" />

      <p className="dark:text-gray-300">
        Spend-Sync is a user-friendly expense tracker app that helps you effortlessly manage and monitor your spending habits. Stay organized and gain
        insights into your financial health with Spend-Sync. Try it now!
      </p>
      <h3 className="dark:text-white" id="live-demo-🎉">Live Demo 🎉</h3>
      <ul>
        <li>
          Explore the live version of Spend-Sync{" "}
          <a className="dark:text-white" target="_blank" href="https://github.com/fazle-rabbi-dev/Spend-Sync">
            here
          </a>
          .
        </li>
      </ul>

      <h3 className="dark:text-white" id="funfact">Fun Fact</h3>

      <blockquote>
        <p className="dark:text-gray-300">
          I created this project entirely using my <strong>Android Phone</strong> with apps: Acode &amp; Termux.
        </p>
      </blockquote>

      <h3 className="dark:text-white" id="🔴-unveiling-the-journey-of-building-spend-sync">🔴 Unveiling the Journey of Building Spend-Sync</h3>
      <blockquote>
        <p className="dark:text-gray-300">
          I embarked on the journey of building Spend-Sync with the goal of tracking personal expenses and aiding others in managing their
          finances. The process brought me joy as I transformed ideas into a real-life application, witnessing its utility firsthand. From inception
          to completion, coding this project was more than a task—it was a passion. Now, with Spend-Sync ready, I find joy in knowing that it will
          make life easier for many.
        </p>
      </blockquote>
      <h3 className="dark:text-white" id="project-created-at">Project Created at</h3>
      <ul>
        <li>
          🗓 <em>March 24 - April 2024</em>
        </li>
      </ul>
      <h3 className="dark:text-white" id="technologies-used-⚒️">Technologies Used ⚒️</h3>
      <ul>
        <li>Vite + React.js</li>
        <li>Tailwindcss</li>
        <li>React-Query</li>
        <li>Appwrite</li>
        <li>Zustand</li>
        <li>React-Hook-Form</li>
        <li>ChatGPT</li>
      </ul>
      <h3 className="dark:text-white" id="features">Features</h3>
      <ul>
        <li>📧 Authentication: Email + password </li>
        <li>🌐 Social login: Google and GitHub </li>
        <li>🌑 Dark theme functionality </li>
        <li>🗑️ Trash feature </li>
        <li>✏️ Expense management: Create, read, delete, update </li>
        <li>📥 Download expenses as PDF: Filtered by date range </li>
        <li>🔍 Search functionality </li>
        <li>📅 Today&#39;s expenses: Displayed with total amount</li>
      </ul>

      <h3 className="dark:text-white" id="📬-connect-with-me">📬 Connect with me</h3>

      <blockquote>
        <p className="dark:text-gray-300">Let's connect! Reach out for collaborations, projects, or just a friendly chat.</p>
      </blockquote>

      <ul>
        <li>
          <a className="dark:text-white" target="_blank" href="https://linkedin.com/in/fazlerabbidev">
            LinkedIn
          </a>
        </li>

        <li>
          <a className="dark:text-white" target="_blank" href="https://twitter.com/fazle_rabbi_dev">
            Twitter
          </a>
        </li>

        <li>
          <a className="dark:text-white" target="_blank" href="https://medium.com/@fazle-rabbi-dev">
            Medium
          </a>
        </li>

        <li>
          <a className="dark:text-white" target="_blank" href="https://dev.to/fazle-rabbi-dev">
            Dev.to
          </a>
        </li>

        <li>
          <a className="dark:text-white" target="_blank" href="https://facebook.com/fazlerabbidev">
            Facebook
          </a>
        </li>

        <li>
          <a className="dark:text-white" target="_blank" href="https://instagram.com/fazle_rabbi_dev">
            Instagram
          </a>
        </li>
      </ul>
    </section>
  );
};
