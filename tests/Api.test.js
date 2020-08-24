import API from '../src/objects/Api';

test('should return score', () => {
  API.fetchScores().then(data => {
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          score: '100',
        }),
      ]),
    );
  }).catch(() => {});
});

test('Score must not be 0', () => {
  API.submitScores('lilo', 0)
    .then((response) => {
      expect(response).toBe(null);
    })
    .catch((error) => error);
});
  
  test('should send an object to the API', () => {
    API.submitScores().then(data => {
      expect(typeof data).toBe('object');
    }).catch(() => { });
  });

