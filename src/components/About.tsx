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
          <h2 className={styles.sectionTitle}>Set Goal</h2>
          <p className={styles.sectionText}>
            Turn dreams into tangible goals with GoalFlow. We help you set
            smart, realistic, and achievable goals. Define what you want to
            accomplish and lay out the steps to get there.
          </p>
        </article>
        <article className={styles.section}>
          <h2 className={styles.sectionTitle}>Achieve</h2>
          <p className={styles.sectionText}>
            Work your way towards your goals with GoalFlow, your partner in
            achievement. Track your progress, celebrate your milestones, and
            realize your dreams one step at a time.
          </p>
        </article>
      </section>
    </main>
  );
};

export default About;
