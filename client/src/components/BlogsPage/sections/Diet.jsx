import React, { useState, useEffect } from 'react';

const Diet = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [playedVideos, setPlayedVideos] = useState([]); // Track which videos have been played

  // List of articles
const articles = [
  {
    title: 'The Ultimate Guide to Healthy Eating: Tips for a Balanced Diet',
    excerpt: 'Eating a balanced diet is key to maintaining a healthy lifestyle. This guide covers essential tips for healthy eating, from nutrient-rich foods to portion control...',
    full: 'A balanced diet is one that provides all the essential nutrients your body needs. These include carbohydrates, proteins, fats, vitamins, and minerals. The key to a healthy diet is variety. You should include a wide range of foods in your meals, focusing on whole, unprocessed foods like fruits, vegetables, lean proteins, and whole grains. This article will help you understand the fundamentals of a balanced diet and provide actionable tips to help you eat better every day.',
  },
  {
    title: 'Top 10 Superfoods You Should Include in Your Diet',
    excerpt: 'Superfoods are nutrient-packed foods that are particularly beneficial for your health. Learn about the best superfoods to incorporate into your daily meals...',
    full: 'Superfoods are rich in essential nutrients like vitamins, minerals, antioxidants, and healthy fats. They can help boost your immune system, improve digestion, and reduce inflammation. In this article, we’ll highlight the top 10 superfoods, including kale, blueberries, quinoa, and chia seeds, that can support your overall health and wellness.',
  },
  {
    title: 'The Truth About Carbs: Are They Good or Bad for You?',
    excerpt: 'Carbohydrates often get a bad rap, but they are an essential part of a healthy diet. This article explains the truth about carbs and how to choose the right ones...',
    full: 'Carbohydrates are one of the three main macronutrients that provide energy to your body. They are classified into simple and complex carbs. Simple carbs, found in sugary foods, can lead to blood sugar spikes, while complex carbs, found in whole grains, vegetables, and legumes, provide a steady source of energy. This article will help you understand the difference between good and bad carbs and how to incorporate healthy carbohydrates into your diet.',
  },
  {
    title: 'Understanding Macronutrients: Proteins, Carbs, and Fats Explained',
    excerpt: 'Macronutrients are the building blocks of your diet. This article breaks down the three main macronutrients—proteins, carbs, and fats—and their role in a healthy diet...',
    full: 'Macronutrients are the nutrients your body needs in large amounts to function properly. Each macronutrient has a specific role in your body. Proteins help build and repair tissues, carbs provide energy, and fats support cell growth and protect organs. This article will explain the importance of each macronutrient, how much you need, and the best sources for each.',
  },
  {
    title: '5 Simple Ways to Improve Your Digestion Through Diet',
    excerpt: 'Good digestion is essential for your overall health. In this article, we share simple dietary changes that can improve your digestive health...',
    full: 'A healthy digestive system is key to nutrient absorption and overall well-being. Some easy ways to improve digestion include increasing fiber intake, drinking more water, and eating smaller meals more frequently. Additionally, incorporating probiotics and fermented foods like yogurt and sauerkraut can support gut health. This article will provide actionable tips to improve your digestion and feel better every day.',
  },
];


  // ✅ List of more embeddable fitness/tutorial videos
  const allVideos = [
    'https://www.youtube.com/embed/c06dTj0v0sM', // Nutrition for a Healthy Life
    'https://www.youtube.com/embed/fqhYBTg73fw', // What's the Best Diet? Healthy Eating 101
    'https://www.youtube.com/embed/9py1G17r3KA', // The Ultimate Guide to a Balanced Diet and Healthy Eating
    'https://www.youtube.com/embed/W2B0NHUUx8Q', // Best Beginners Guide To Diet & Nutrition (START HERE)
    'https://www.youtube.com/embed/llgJYsoyILU', // Easy Nutrition Tips That Actually Make Sense
    'https://www.youtube.com/embed/jwWpTAXu-Sg', // Beginners Guide to Healthy Eating – 15 Tips
    'https://www.youtube.com/embed/pQZZY5A0lSA', // Build Muscle & Lose Fat (Diet + Workout Plan)
    'https://www.youtube.com/embed/VSFhkV2V5PU', // FREE Diet & Workout Plan to Lose Belly Fat
    'https://www.youtube.com/embed/oPRrl-ZhrJQ', // Science‑Based Diet to Build Lean Muscle (All Meals)
    'https://www.youtube.com/embed/LCyECbA3pUw', // Best Meal Plan to Lose Fat Faster (Eat Like This!)
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
        {activeTab === 'videos' ? 'Diet Videos' : 'Diet Articles'}
      </div>

      {activeTab === 'videos' ? (
        <div style={styles.videosContainer}>
          {videosToShow.map((url, index) => {
            const videoId = url.split('/').pop();
            return (
              <iframe
                key={index}
                src={playedVideos.includes(index) ? `${url}?autoplay=1&loop=1&playlist=${videoId}` : `${url}`}
                title={`diet-video-${index}`}
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

export default Diet;
