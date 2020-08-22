export const SpawnerType = {
    MONSTER: 'MONSTER',
    CHEST: 'CHEST',
  };
  
  export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
  }