import Sky from '../assets/sky.jpg';

const styles = {
  container:
    'flex flex-col items-center min-h-screen pt-10 md:pt-20 lg:pt-32 text-center px-4 lg:px-32 text-black',
  title:
    'text-3xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-10 text-[#fffffe]',
  flexContainer:
    'w-full flex flex-col md:flex-row justify-center items-center md:space-x-4 flex-grow',
  section:
    'bg-[#004449] px-4 py-8 rounded-md m-2 h-[50vh] md:h-[40vh] lg:h-[50vh] xl:h-[60vh] flex flex-col items-center justify-center w-full md:w-1/3',
  sectionTitle: 'text-[#fffffe] text-4xl mb-4',
  sectionText: 'text-[#d7ffc2]',
};

const About = () => {
  return (
    <main
      className={styles.container}
      style={{
        backgroundImage: `url(${Sky})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="About section with background image of a sky"
    >
      <h1 className={styles.title}>Shape Your Future with GoalFlow</h1>
      <section
        className={styles.flexContainer}
        aria-labelledby="about-sections"
      >
        <h2 id="about-sections" className="sr-only">
          About Sections
        </h2>
        <article className={styles.section}>
          <h2 className={styles.sectionTitle}>Dream</h2>
          <p className={styles.sectionText}>
            Dream and imagine the future you desire. Let GoalFlow guide you in
            visualizing your ambitions and aspirations in life. There's no dream
            too big or too small.
          </p>
        </article>
        <article className={styles.section}>
          <p className={styles.sectionText}>Coming Soon</p>
          <h2 className={styles.sectionTitle}>Reminders</h2>
          <p className={styles.sectionText}>
            Stay on track with GoalFlow's reminder functionality. You can set
            reminders to get email alerts to check in with yourself on goal
            progress. Make your goals a priority and never lose sight of them.
          </p>
        </article>
        <article className={styles.section}>
          <p className={styles.sectionText}>Coming Soon</p>
          <h2 className={styles.sectionTitle}>Share</h2>
          <p className={styles.sectionText}>
            Share your accomplishments with others through GoalFlow. Our sharing
            functionality lets you celebrate your milestones by showcasing your
            completed goals. Inspire others on their journey and get inspired by
            the achievements shared by others.
          </p>
        </article>
      </section>
    </main>
  );
};

export default About;
