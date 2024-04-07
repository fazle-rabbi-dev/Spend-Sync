export const Footer = () => {
  return (
    <footer className="bg-light-50 text-black py-6 px-4 md:px-6 lg:px-8 text-center mt-16 dark-theme">
      <p className="body-text">&copy; {new Date().getFullYear()} Spend-Sync • All rights reserved.</p>
      <p className="mt-4">
        Made with &hearts; by{" "}
        <a className="underline" target="_blank" href="https://bio.link/fazle_rabbi_dev">
          Fazle Rabbi
        </a>
      </p>
    </footer>
  );
};
