import "./About.css";
import vklogo from "../../images/vklogo.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image">
          <img src={vklogo} alt="Author Image" className="about__image" />
        </div>
        <div className="about__text-container">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            Hey there, I'm Vipanpreet Kaur Sahota, a passionate Full Stack Web
            Developer from Union City, California. My journey into web
            development began at TripleTen, where I not only discovered my love
            for coding but also developed a solid foundation in various
            technologies. At TripleTen, I mastered the essentials like HTML and
            CSS and progressed into more advanced areas such as JavaScript,
            React, Node, and Express. I also became proficient in Git, which has
            been invaluable for managing and collaborating on projects. I truly
            enjoyed my time at TripleTen, where I gained the skills and
            confidence to tackle a wide range of development challenges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
