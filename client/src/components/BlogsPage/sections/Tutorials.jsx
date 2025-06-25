// import React, { useState, useEffect } from "react";

// // ✅ All videos with your original inline comments
// const allVideos = [
//   'https://www.youtube.com/embed/v7AYKMP6rOE', // 10 Min Morning Yoga
//   'https://www.youtube.com/embed/qWy_aOlB45Y', // Full Body Workout
//   'https://www.youtube.com/embed/ml6cT4AZdqI', // Fat Burn Workout
//   'https://www.youtube.com/embed/UItWltVZZmE', // Beginner Friendly
//   'https://www.youtube.com/embed/2pLT-olgUJs', // Abs Workout
//   'https://www.youtube.com/embed/UBMk30rjy0o', // HIIT Training
//   'https://www.youtube.com/embed/E3Z6n3r3qI4', // Dumbbell Workout
//   'https://www.youtube.com/embed/Tf2tppwsVj8', // Strength Training
//   'https://www.youtube.com/embed/50kH47ZztHs', // Daily Stretch
//   'https://www.youtube.com/embed/BHY0FxzoKZE', // Yoga for Beginners
// ];

// // ✅ Sample articles — replace or extend as needed
// const articles = [
//   {
//     title: "5 Tips for a Healthier Life",
//     content: "Start your day with a healthy breakfast and some meditation...",
//   },
//   {
//     title: "Why Rest Days Matter",
//     content: "Overtraining can be harmful. Give your body time to recover...",
//   },
//   {
//     title: "Top 10 Protein Sources",
//     content: "Eggs, chicken, lentils, Greek yogurt, and more...",
//   },
//   {
//     title: "Hydration and Performance",
//     content: "Drinking enough water improves focus and stamina...",
//   },
//   {
//     title: "Mental Strength in Gym",
//     content: "Staying consistent requires mental strength as much as physical...",
//   },
//   {
//     title: "Stretching Before and After Workouts",
//     content: "Proper stretching reduces injury risk and improves flexibility...",
//   },
// ];

// // ✅ Utility function to get `count` random items from an array
// function getRandomItems(array, count) {
//   const shuffled = [...array].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }

// const BlogSection = () => {
//   // State to hold the randomly selected articles and videos
//   const [articlesToShow, setArticlesToShow] = useState([]);
//   const [videosToShow, setVideosToShow] = useState([]);

//   // ✅ useEffect runs only once (on mount) to select random items
//   useEffect(() => {
//     setArticlesToShow(getRandomItems(articles, 4)); // Show 4 random articles
//     setVideosToShow(getRandomItems(allVideos, 6));  // Show 6 random videos
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       {/* ✅ Videos Section */}
//       <h2>Workout Videos</h2>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {videosToShow.map((video, index) => (
//           <iframe
//             key={index}
//             width="100%"
//             height="200"
//             src={video}
//             title={`Video ${index + 1}`}
//             frameBorder="0"
//             allowFullScreen
//           />
//         ))}
//       </div>

//       {/* ✅ Articles Section */}
//       <h2 style={{ marginTop: "40px" }}>Recommended Articles</h2>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {articlesToShow.map((article, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: "16px",
//               borderRadius: "8px",
//               backgroundColor: "#f9f9f9",
//             }}
//           >
//             <h3>{article.title}</h3>
//             <p>{article.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogSection;

import React, { useState, useEffect } from 'react';

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [playedVideos, setPlayedVideos] = useState([]); // Track which videos have been played

// List of articles for Gym Tips section
const articles = [
  {
    title: "Mastering the Barbell: A Guide to the Big Lifts",
    excerpt: "Barbell training is a foundational element of strength development. Learn how to safely and effectively perform compound barbell lifts...",
    full: "Barbell exercises like squats, deadlifts, and bench presses are key to strength progression. This article offers step-by-step form cues, common mistakes to avoid, warm-up suggestions, and progression plans to help you build strength while minimizing risk of injury.",
  },
  {
    title: "Push-Pull-Legs Split: The Smart Way to Structure Your Gym Days",
    excerpt: "If you're working out 3 to 6 times a week, a Push-Pull-Legs split is one of the most effective ways to train...",
    full: "This training split divides workouts by movement pattern, allowing optimal recovery while targeting all muscle groups. Learn how to schedule your week, choose the right exercises for each day, and track your progress efficiently.",
  },
  {
    title: "Time Under Tension: Unlocking Growth With Controlled Reps",
    excerpt: "Do more reps always mean more gains? Not necessarily. Learn how slowing down your reps can dramatically impact your muscle growth...",
    full: "Time under tension (TUT) refers to the amount of time your muscles are working during a set. This article explains how to implement TUT into your workouts using tempo techniques, recommended timing ranges, and how it affects hypertrophy versus strength.",
  },
  {
    title: "Warm-Up Like a Pro: Dynamic Movements to Prevent Injury",
    excerpt: "A proper warm-up doesn't just prepare you physically—it boosts performance too. Learn how to warm up like athletes do...",
    full: "Forget static stretches before lifting. This guide introduces dynamic warm-up techniques like mobility drills, resistance band activations, and cardio ramp-ups that prime your muscles and joints for heavy training. It also includes warm-up templates for different workout types.",
  },
  {
    title: "Gym Machines vs. Free Weights: Which Should You Use?",
    excerpt: "Is it better to lift with machines or dumbbells? This article breaks down the pros and cons of both to help you decide...",
    full: "Free weights offer better stability and recruit more muscles, but machines provide safety and simplicity for beginners. Learn when to use each, how to combine them in your training, and common myths about machine training debunked.",
  },
];


  // ✅ List of more embeddable fitness/tutorial videos
  const allVideos = [
    'https://www.youtube.com/embed/v7AYKMP6rOE', // 10 Min Morning Yoga
    'https://www.youtube.com/embed/ml6cT4AZdqI', // Fat Burn Workout
    'https://www.youtube.com/embed/2pLT-olgUJs', // Abs Workout
    'https://www.youtube.com/embed/50kH47ZztHs', // Daily Stretch
    'https://www.youtube.com/embed/BHY0FxzoKZE', // Yoga for Beginners
    'https://www.youtube.com/embed/ixkQaZXVQjs', // The PERFECT Beginner Workout (Sets & Reps)
    'https://www.youtube.com/embed/m1UF4RgGoY0', // Complete Beginner’s Gym Guide & Equipment Tour
    'https://www.youtube.com/embed/cPOJHiatD2w', // WEEK 1 | Weight Training for Beginners (3x/week)
    'https://www.youtube.com/embed/ySwgYYgRZvE', // Beginner Full Body Gym Workout

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
        {activeTab === 'videos' ? 'Tutorial Videos' : 'Tutorial Articles'}
      </div>

      {activeTab === 'videos' ? (
        <div style={styles.videosContainer}>
          {videosToShow.map((url, index) => {
            const videoId = url.split('/').pop();
            return (
              <iframe
                key={index}
                src={playedVideos.includes(index) ? `${url}?autoplay=1&loop=1&playlist=${videoId}` : `${url}`}
                title={`tutorial-video-${index}`}
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

export default Tutorials;