import dayjs from 'dayjs';
import 'dayjs/locale/sv.js';

/**
 * Returns the diff in days between two dates.
 */
export const getDiffDays = (date1, date2 = new Date()) => {
  date1 = new Date(date1);

  // The diff in days between date1 and date2.
  const diff = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));

  return diff;
};

/**
 * Preloads an image.
 */
export const preloadImage = (src) => {
  return new Promise(function (resolve) {
    let img = new Image();
    img.onload = resolve;
    img.src = src;
  });
};

/**
 * Preloads multiple images.
 */
export const preloadImages = (images) => {
  images.forEach((image) => {
    preloadImage(image);
  });
};

/**
 * Formats a date to a given format.
 */
export const getDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).locale('sv').format(format);
};

/**
 * Get n random posts from a given array.
 */
export const getRandomArrayPosts = (array, posts) => {
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  return shuffled.slice(0, posts);
};
