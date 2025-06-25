import React, { useState, useEffect } from 'react';

const Mind = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [playedVideos, setPlayedVideos] = useState([]);

  const articles = [
    {
      title: "Train Your Brain: Simple Habits That Boost Mental Clarity",
      excerpt: "Struggling with brain fog or lack of focus? This article reveals daily habits that enhance mental clarity and concentration...",
      full: "Your brain, like any muscle, needs regular care. Practicing mindfulness, limiting screen time, getting quality sleep, and engaging in mentally stimulating activities like reading or puzzles can significantly boost your cognitive function. Learn how to incorporate these simple yet effective habits into your everyday routine for a sharper, more focused mind.",
    },
    {
      title: "Morning Mindset Rituals: Start Your Day with Positivity",
      excerpt: "Your morning routine sets the tone for your entire day. Discover powerful rituals to build a calm, confident mindset...",
      full: "From mindful breathing and gratitude journaling to light stretching and planning your priorities, a structured morning ritual can set a strong foundation for emotional resilience and productivity. This article guides you through a 15-minute ritual that energizes your mind and helps you stay grounded throughout the day.",
    },
    {
      title: "The Science of Motivation: How to Stay Driven When You Feel Like Quitting",
      excerpt: "Everyone loses motivation sometimes. Learn what actually keeps us going according to science...",
      full: "Motivation is not just about willpower—it’s about understanding your ‘why,’ setting achievable goals, and celebrating small wins. This article explains intrinsic vs. extrinsic motivation, the role of dopamine in habit formation, and how to build systems that keep you inspired even on low-energy days.",
    },
    {
      title: "Declutter Your Mind: Techniques to Reduce Mental Overload",
      excerpt: "Too many thoughts? Too much stress? Learn how to declutter your mind and focus on what truly matters...",
      full: "Mental clutter comes from multitasking, constant notifications, unresolved worries, and lack of mental breaks. This guide offers practical strategies like brain dumping, mindfulness meditation, and digital detoxing to create more space in your mind and reduce anxiety.",
    },
    {
      title: "Visualization for Success: How to Mentally Prepare Like Athletes and CEOs",
      excerpt: "Top performers across industries use mental imagery to fuel success. Here’s how you can too...",
      full: "Visualization is more than wishful thinking. It’s a scientifically backed technique used by Olympic athletes and entrepreneurs alike to rehearse success. Learn how to visualize your goals with clarity and emotion, and how this daily practice can rewire your brain to stay focused and confident.",
    },
  ];
  

  const allVideos = [
  'https://www.youtube.com/embed/ZToicYcHIOU', // 10 Min Guided Meditation

  'https://www.youtube.com/embed/D0-3RO17_4E', // 5 Easy Meditation Tips for Beginners
  'https://www.youtube.com/embed/Zkx62MZsnKQ', // 10 Meditation Tips to Get the Most Out of Practice
  'https://www.youtube.com/embed/thcEuMDWxoI', // Meditation Is Easier Than You Think (Transform Stress)

  'https://www.youtube.com/embed/Z9o1MuwDnN4', // 5 Simple Tips for a Peaceful Mind :contentReference[oaicite:2]{index=2}
  'https://www.youtube.com/embed/GwNCjKmnBco', // Harmonizing Your Mind – Inner Peace Strategies :contentReference[oaicite:3]{index=3}
  'https://www.youtube.com/embed/0v_Ct1TXKUY', // Mastering Inner Peace – Peaceful Mind Guide :contentReference[oaicite:4]{index=4}
  'https://www.youtube.com/embed/9JLyZGFsGck', // 5 Mindful Habits for a Peaceful & Happy Life :contentReference[oaicite:7]{index=7}
  ];

  const getRandomItems = (items, count) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setArticlesToShow(getRandomItems(articles, 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const videosToShow = getRandomItems(allVideos, 6);

  const handleVideoClick = (index) => {
    setPlayedVideos((prevState) => [...prevState, index]);
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      minHeight: '100vh',
      boxSizing: 'border-box',
      overflowY: 'auto',
      overflowX: 'auto',
    },
    tabButtons: {
      display: 'inline-flex',
      gap: '20px',
      marginBottom: '30px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#388e3c',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    contentHeader: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    videosContainer: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    videoFrame: {
      width: '300px',
      height: '180px',
      borderRadius: '8px',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
    },
    articlesContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
    },
    articlePreview: {
      width: '70%',
      textAlign: 'left',
    },
    popup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabButtons}>
        <button style={styles.button} onClick={() => setActiveTab('videos')}>Videos</button>
        <button style={styles.button} onClick={() => setActiveTab('articles')}>Articles</button>
      </div>

      <div style={styles.contentHeader}>
        {activeTab === 'videos' ? 'Mind Videos' : 'Mind Articles'}
      </div>

      {activeTab === 'videos' ? (
        <div style={styles.videosContainer}>
          {videosToShow.map((url, index) => {
            const videoId = url.split('/').pop();
            return (
              <iframe
                key={index}
                src={
                  playedVideos.includes(index)
                    ? `${url}?autoplay=1&loop=1&playlist=${videoId}`
                    : `${url}`
                }
                title={`mind-video-${index}`}
                style={styles.videoFrame}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                onClick={() => handleVideoClick(index)}
              ></iframe>
            );
          })}
        </div>
      ) : (
        <div style={styles.articlesContainer}>
          {articlesToShow.map((article, idx) => (
            <div key={idx} style={styles.articlePreview}>
              <h4>{article.title}</h4>
              <p>{article.excerpt}</p>
              <button
                style={styles.button}
                onClick={() => setSelectedArticle(article)}
              >
                Read More
              </button>
            </div>
          ))}
          {selectedArticle && (
            <div style={styles.popup}>
              <h3>{selectedArticle.title}</h3>
              <p>{selectedArticle.full}</p>
              <button
                style={styles.button}
                onClick={() => setSelectedArticle(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mind;
