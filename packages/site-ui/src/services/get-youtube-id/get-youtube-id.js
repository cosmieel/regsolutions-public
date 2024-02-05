const YOUTUBE_ID_REGEX =
  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export function getYoutubeId(link) {
  const match = link.match(YOUTUBE_ID_REGEX);
  return match && match[7].length === 11 ? match[7] : null;
}
