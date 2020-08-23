
const Api = (() => {
  
    const key = 'Hm3s8TVlfpOKKVs5mLeb';
    async function fetchScores() {
        try {
          const scores = await fetch(
            `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            },
          );
    
          return scores.json();
        } catch (error) {
          return error.json();
        }
      }
    
      async function submitScores(name, score) {
        try {
          const result = await fetch(
            `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: name,
                score,
              }),
            },
          );
    
          return result.json();
        } catch (error) {
          return error.json();
        }
      }
    
      return { fetchScores, submitScores };
  })();
  
  export default Api;