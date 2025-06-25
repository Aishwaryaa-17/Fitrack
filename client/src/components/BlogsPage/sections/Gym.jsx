import React, { useState, useEffect } from 'react';

const Gym = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [playedVideos, setPlayedVideos] = useState([]); // Track which videos have been played

// List of articles for Gym Tips section
const articles = [
  {
    title: "Beginners Gym Guide: Everything You Need to Know Before Your First Workout",
    excerpt: "Walking into a gym for the first time can feel intimidating. This article walks you through what to expect, what to bring, and how to get started...",
    full: "Starting your gym journey begins with preparation. Wear comfortable workout clothes, bring a water bottle, and plan your workout ahead of time. Learn how to use the basic machines and do not hesitate to ask trainers for help. This article offers a detailed checklist and motivation tips to help you start strong and stay consistent in your fitness journey.",
  },
  {
    title: "The Best Gym Exercises for Building Full Body Strength",
    excerpt: "Looking to build strength efficiently? Discover the top compound exercises that target multiple muscle groups and deliver maximum results...",
    full: "Compound movements like squats, deadlifts, bench press, pull ups, and rows engage multiple muscle groups, making them ideal for building full body strength. This guide explains how to perform each exercise with proper form, suggested reps and sets, and how to progress safely over time.",
  },
  {
    title: "Gym Etiquette 101: Dos and Donts for Every Gym Goer",
    excerpt: "Good gym etiquette makes the experience better for everyone. Here are some essential tips to follow during your workouts...",
    full: "From wiping down machines after use to not hogging equipment during peak hours, understanding basic gym etiquette helps maintain a positive and respectful environment. This article covers everything from proper attire and equipment sharing to noise control and safety guidelines, making sure you are a welcome member of your gym community.",
  },
  {
    title: "Rest and Recovery: Why It Is Just as Important as Training",
    excerpt: "Many gym goers make the mistake of underestimating rest. This article explains why recovery is crucial for progress and injury prevention...",
    full: "Training hard without enough rest can lead to overtraining, fatigue, and even injuries. Rest days allow your muscles to recover and grow. Learn about the science behind muscle recovery, the importance of sleep, and how active recovery like light cardio or stretching can benefit your routine.",
  },
  {
    title: "How to Create a Gym Workout Routine That Works for You",
    excerpt: "Having a structured workout plan is key to seeing results. This article helps you design a weekly gym schedule tailored to your goals...",
    full: "Whether your goal is weight loss, muscle gain, or improved endurance, your routine should reflect that. This article breaks down how to balance cardio, strength training, and rest days into a weekly plan. You will also learn how to track progress and modify your routine over time based on your performance.",
  },
];

  // ✅ List of more embeddable fitness/tutorial videos
  const allVideos = [
    'https://www.youtube.com/embed/v7AYKMP6rOE', // 10 Min Morning Yoga
    'https://www.youtube.com/embed/ml6cT4AZdqI', // Fat Burn Workout
    'https://www.youtube.com/embed/50kH47ZztHs', // Daily Stretch
    'https://www.youtube.com/embed/BHY0FxzoKZE', // Yoga for Beginners
    'https://www.youtube.com/embed/gC_L9qAHVJ8', // Walking Workout for Weight Loss
    'https://www.youtube.com/embed/roIUHzRAFpQ', // Proper Technique to Lifting Weights – form & safety
    'https://www.youtube.com/embed/3ElVeCqEg2Q', // Follow These 7 Simple Habits For A Better Gym Workout
    'https://www.youtube.com/embed/46ZgMeqx8-E', // 10 Random Gym Tips Everyone Should Know (advanced & beginner advice)
    'https://www.youtube.com/embed/QqhecpMgFuI', // Master Advanced Gym Techniques to Boost Your Workout
    'https://www.youtube.com/embed/wp0EEuZJcYs', // Advanced Techniques & Strategies to Overcome Plateaus
  ];
  

  // ✅ Randomize and pick random items
  const getRandomItems = (items, count) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Set articles and videos on page load
  useEffect(() => {
    setArticlesToShow(getRandomItems(articles, 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const videosToShow = getRandomItems(allVideos, 6);

  const handleVideoClick = (index) => {
    // Add the video to the played list when it's clicked
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
      cursor: 'pointer', // Change cursor to pointer when hovering
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
        {activeTab === 'videos' ? 'Gym Videos' : 'Gym Articles'}
      </div>

      {activeTab === 'videos' ? (
        <div style={styles.videosContainer}>
          {videosToShow.map((url, index) => {
            const videoId = url.split('/').pop();
            return (
              <iframe
                key={index}
                src={playedVideos.includes(index) ? `${url}?autoplay=1&loop=1&playlist=${videoId}` : `${url}`}
                title={`gym-video-${index}`}
                style={styles.videoFrame}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                onClick={() => handleVideoClick(index)} // Mark video as played on click
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

export default Gym;



